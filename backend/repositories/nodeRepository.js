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

  // @todo: disparar assincronamente
  async syncNodes() {
    console.log('synchronizing nodes')
    const nodes = await gistService.getFileInGist(NODE_LIST_GIST_ID, NODE_LIST_FILENAME)
    const activeNodes = []

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];

      try {
        const config = { timeout: 1000, headers: { 'Bypass-Tunnel-Reminder': 'true' } }
        const response = await axios.get(`${node.host}/stats`, config)
          
        if (response.data.url === node.host) {
          activeNodes.push(node)
        }
      } catch (error) {
        console.log(`offline node: ${node.host}`)
      }
    }

    await gistService.updateFileInGist(activeNodes, NODE_LIST_GIST_ID, NODE_LIST_FILENAME)

    return this.nodeList()
  }

}

module.exports = new nodeRepository();