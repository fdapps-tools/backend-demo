
const fs = require('fs');

const PATH = './localDB'

class localDBService {

  getFile(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${PATH}/${filename}`, 'utf8', function (err, data) {
        if (err) {
          // @todo: tratar erros quando arquivo não existir
          resolve([])
        }
        const document = data ? JSON.parse(data) : []
        resolve(document)
      });
    })
  }

  updateFile(data, filename) {
    fs.writeFile(`${PATH}/${filename}`, JSON.stringify(data), function (err) {
      if (err) return console.log(err);
    });
  }
}

module.exports = new localDBService();
