
const fs = require('fs').promises;
const PATH = './localDB'

module.exports = {

  async getFile(filename) {
    const data = await fs.readFile(`${PATH}/${filename}.state`, 'utf8')
    return data ? JSON.parse(data) : []
  },

  async updateFile(data, filename, broadcast = false) {
    await fs.writeFile(`${PATH}/${filename}.state`, JSON.stringify(data))

    // @todo: Será melhor fazer esse broadcast de outro jeito para seja possível testá-lo individualmente
    if (broadcast) {
      const file = await this.getFile(filename)
      const nodeRepository = require('../repositories/nodeRepository');

      nodeRepository.broadcastToAllNodes(filename, file)
    }
    return true
  }
  
}