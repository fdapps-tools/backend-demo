const localDBService = require('../services/localDBService');
const { baseFolderHash } = require('../libs/hash')
const axios = require('axios');
var express = require("express")
var app = express()

const NODE_LIST_FILENAME = process.env.NODE_LIST_FILENAME || 'node-list'
const REQUEST_LIST_FILENAME = process.env.REQUEST_LIST_FILENAME || 'request-list'

class nodeRepository {

  getNodeList() {
    return localDBService.getFile(NODE_LIST_FILENAME)
  }

  async insertNode(node) {

    const nodes = await localDBService.getFile(NODE_LIST_FILENAME) || []
    nodes.push(node)

    return localDBService.updateFile(nodes, NODE_LIST_FILENAME)
  }

  async joinRequest(request) {
    console.log(`Request to Join: ${request}`)
    const requesteds = await localDBService.getFile(REQUEST_LIST_FILENAME) || []
    requesteds.push(request)
    localDBService.updateFile(requesteds, REQUEST_LIST_FILENAME)
  }

  async checkNodesIsUp() {
    console.log('synchronizing nodes')
    const lastcheck = Date.now()
    const nodes = await localDBService.getFile(NODE_LIST_FILENAME)

    await Promise.allSettled(nodes.map(node => this.checkHostIsUp(node, lastcheck)))

    await localDBService.updateFile(
      nodes.filter(node => node.lastcheck == lastcheck),
      NODE_LIST_FILENAME
    )

    return this.getNodeList()
  }

  async checkHostIsUp(node, lastcheck = Date.now()) {
    return new Promise((resolve, reject) => {
      const config = { timeout: 5000, headers: { 'Bypass-Tunnel-Reminder': 'true' } }
      axios.get(`${node.host}/stats`, config)
        .then(response => {
          if (response.data.url === node.host) {
            node.lastcheck = lastcheck
            resolve(true)
          } else {
            reject(false)
          }
        })
        .catch(error => {
          console.log(node.host, error.response.status)
          reject(false)
        })
    })
  }

  /**
   * Esta função verifica a lista de nós pendentes de serem confirmados
   * Para que tenha uma analise concensual, a verificação inicial trata de inputar uma aprovação unica 
   * Cada nó da rede terá que verificar e quando o último verificar, ele deverá remover da lista de requests e incluir na de nós confirmados
   * 
   * Em tempo de desenvolvimento isso está extremamente complicado pois quando você altera o código o hash muda
   * @todo: Melhorar o esquema de assincronia e simplificar esse método, está muito complexo
   */
  async syncJoinRequests(localTunnel) {

    console.log('syncJoinRequests', localTunnel)
    const requesteds = await localDBService.getFile(REQUEST_LIST_FILENAME) || []

    const nodes = await this.getNodeList()

    for (let index = 0; index < requesteds.length; index++) {
      const host = requesteds[index];
      let isOnline = false

      try {
        // Verificar se o nó está online antes de prosseguir com ele
        isOnline = await this.checkHostIsUp(requesteds[index])
      } catch (error) {

      }

      if (isOnline) {
        const validation = { createdAt: Date.now(), host: localTunnel }
        await this.setApprovalOrInapproval(host, validation)

        // se todos os nós já tiverem aprovado
        if (host.approvations.length >= nodes.length) {
          // remover dessa lista
          requesteds.splice(index, 1)

          // incluir na lista de hosts
          nodes.push(host)
          localDBService.updateFile(nodes, NODE_LIST_FILENAME)
          continue

        }
      } else {
        requesteds.splice(index, 1)
        continue
      }

      if (host.unnaprovations?.length >= nodes.length) {
        // remover dessa lista
        requesteds.splice(index, 1)
      }
    }

    localDBService.updateFile(requesteds, REQUEST_LIST_FILENAME)
    console.log('syncJoinRequests finishing', requesteds)
  }

  // @todo: isso esta bem feio, tem que refatorar
  async setApprovalOrInapproval(host, validation) {
    // se o hash no host for igual ao do nó
    if (host.applicationHash === await baseFolderHash()) {
      // @todo: Verificar se já nao fez antes
      console.log(`approving: ${host.host}`)
      if (host.approvations) {
        // evita que seja aprovado duas vezes
        if (!host.approvations.find(approval => approval.host === localTunnel)) {
          host.approvations.push(validation)
        }
      } else {
        host.approvations = [validation]
      }
    } else {
      console.log(`unnapproving: ${host.host}`)
      if (host.unnaprovations) {
        // evita que seja desaprovado duas vezes
        if (!host.unnaprovations.find(approval => approval.host === localTunnel)) {
          host.unnaprovations.push(validation)
        }
      } else {
        host.unnaprovations = [validation]
      }
    }
  }

  /**
   * Esta função faz a verificação se o host fará parte de uma rede existente ou criará uma nova
   * A validaçãoo de confiança esta sendo realizada pelo hash do diretório raiz
   */
  async initNode(tunnel) {

    const hash = await baseFolderHash()

    if (process.env.NETWORK_NODE_URL) {
      console.log(`trying join to network from ${process.env.NETWORK_NODE_URL} ...`)

      try {

        const node = { host: tunnel.url, requested: Date.now(), applicationHash: hash }
        const response = await axios.post(`${process.env.NETWORK_NODE_URL}/join-request`, node)

        console.log('network response: ', response.data)

      } catch (error) {
        console.log('error', error)
        console.log('error: this network node is not available, change NETWORK_NODE_URL or starting as first node')
        process.exit();
      }

    } else {

      await this.insertNode({ host: tunnel.url, lastcheck: Date.now(), applicationHash: hash })
      console.log(`dont did set network node, started as new network.`)

    }
  }

}

module.exports = new nodeRepository();