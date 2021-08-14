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

  async checkHostIsUp(node, lastcheck) {
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
   * Cada nó da rede terá que verificar, e o último a verificar deverá fazer o broadcast informando o novo nó
   * 
   * Em tempo de desenvolvimento isso está extremamente complicado pois quando você altera o código o hash muda
   */
  async syncJoinRequests(localTunnel) {

    console.log('syncJoinRequests', localTunnel)
    const requesteds = await localDBService.getFile(REQUEST_LIST_FILENAME) || []

    const nodes = this.getNodeList()

    for (let index = 0; index < requesteds.length; index++) {
      const host = requesteds[index];

      // Verificar se o nó está online antes de prosseguir com ele


      
      // se o hash no host for igual ao do nó
      const validation = { createdAt: Date.now(), host: localTunnel }

      console.log('node: ', host.applicationHash)
      console.log('host: ', await baseFolderHash())

      if (host.applicationHash === await baseFolderHash()) {
        // @todo: Verificar se já nao fez antes
        if (host.approvations) {
          host.approvations.push(validation)
        } else {
          host.approvations = [validation]
        }
      } else {
        // @todo: Verificar se já nao fez antes
        if (host.unnaprovations) {
          host.unnaprovations.push(validation)
        } else {
          host.unnaprovations = [validation]
        }
      }

      // @todo: Verificar se o total de aprovação ou desaprovação é igual ao total de nós
      // Caso sim, remover ele da lista de requests e processar a migração dele para ser um Nó
      // Popular na lista de nós e fazer broadcast para a rede
    }

    console.log(requesteds)
    localDBService.updateFile(requesteds, REQUEST_LIST_FILENAME)
  }

  /**
   * Esta função faz a verificação se o host fará parte de uma rede existente ou criará uma nova
   * A validaçãoo e confiança esta sendo realizada pelo hash do diretório raiz
   */
  async initNode(tunnel) {

    if (process.env.NETWORK_NODE_URL) {

      console.log(`trying join to network from ${process.env.NETWORK_NODE_URL} ...`)
      try {

        const hash = await baseFolderHash()

        const node = { host: tunnel.url, requested: Date.now(), applicationHash: hash }
        const response = await axios.post(`${process.env.NETWORK_NODE_URL}/join-request`, node)

        console.log('network response: ', response.data)

      } catch (error) {
        console.log('error', error)
        console.log('error: this network node is not available, change NETWORK_NODE_URL or starting as first node')
        process.exit();
      }

    } else {

      await this.insertNode({ host: tunnel.url, lastcheck: Date.now() })
      console.log(`dont did set network node, started as new network.`)

    }
  }

}

module.exports = new nodeRepository();