const fs = require('fs').promises;
const PATH = './src/localDB'

module.exports = {

  async getFile(filename) {
    let data = "[]"

    try {
      data = await fs.readFile(`${PATH}/${filename}.state`, 'utf8')

    } catch (error) {
      if (error.errno == "-2") {
        await fs.writeFile(`${PATH}/${filename}.state`, "[]")
      }
    }

    return JSON.parse(data)
  },

  async updateFile(data, filename) {
      await fs.writeFile(`${PATH}/${filename}.state`, JSON.stringify(data))
      return true
  },

}