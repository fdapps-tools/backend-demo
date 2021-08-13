const gistService = require('../services/gistService');
const axios = require('axios');

const NODE_LIST_FILENAME = process.env.NODE_LIST_FILENAME
const NODE_LIST_GIST_ID = process.env.NODE_LIST_GIST_ID

/**
 * É importante estudar a respeito de qual a melhor maneira de criar estes nós, qual estrutura de dados será utilizada para ter uma boa performance.
 * Por agora, o gist é apenas para exemplificar o funcionamento, mas precisa ser refatorado para uma estrutura de dados mais robusta.
 * Assim como a verificação se o host é confiável e não só se esta ativo
 */
class nodeRepository {

  nodeList() {
    return gistService.getFileInGist(NODE_LIST_GIST_ID, NODE_LIST_FILENAME)
  }

  async insertNode(node) {

    const nodes = await gistService.getFileInGist(NODE_LIST_GIST_ID, NODE_LIST_FILENAME)
    nodes.push(node)

    return gistService.updateFileInGist(nodes, NODE_LIST_GIST_ID, NODE_LIST_FILENAME)
  }

  async syncNodes() {
    console.log('synchronizing nodes')
    const lastcheck = Date.now()
    const nodes = await gistService.getFileInGist(NODE_LIST_GIST_ID, NODE_LIST_FILENAME)

    await Promise.allSettled(nodes.map(node => this.checkNode(node, lastcheck)))

    await gistService.updateFileInGist(
      nodes.filter(node => node.lastcheck == lastcheck),
      NODE_LIST_GIST_ID,
      NODE_LIST_FILENAME
    )

    return this.nodeList()
  }

  async checkNode(node, lastcheck) {
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

}

module.exports = new nodeRepository();