const gistService = require('../services/gistService');

const NODE_LIST_FILENAME = process.env.NODE_LIST_FILENAME
const NODE_LIST_GIST_ID = process.env.NODE_LIST_GIST_ID

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

  }

}

module.exports = new nodeRepository();