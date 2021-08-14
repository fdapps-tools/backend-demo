
const fs = require('fs');

const PATH = './localDB'
class localDBService {

  getFile(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(`${PATH}/${filename}.state`, 'utf8', function (err, data) {
        if (err) {
          // @todo: tratar erros quando arquivo não existir
          resolve([])
        }
        const document = data ? JSON.parse(data) : []
        resolve(document)
      });
    })
  }

  // @todo: depois de atualizar o arquivo, deve-se disparar o broadcast para os nós se atualizarem
  updateFile(data, filename) {
    fs.writeFile(`${PATH}/${filename}.state`, JSON.stringify(data), function (err) {
      if (err) return console.log(err);
    });
  }
}

module.exports = new localDBService();
