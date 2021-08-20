
const fs = require('fs').promises;
const PATH = './src/localDB'

module.exports = {

  async getFile(filename) {
    const data = await fs.readFile(`${PATH}/${filename}.state`, 'utf8')
    return data ? JSON.parse(data) : []
  },

  async updateFile(data, filename) {
    await fs.writeFile(`${PATH}/${filename}.state`, JSON.stringify(data))
    return true
  },
  
}