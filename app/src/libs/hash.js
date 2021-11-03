
const { hashElement } = require('folder-hash');

module.exports = {
  async baseFolderHash() {
    const options = {
      folders: { exclude: ['.*', 'node_modules', 'test_coverage', 'localDB'] },
      files: { include: ['*.js', '*.json'] },
    };

    const { hash } = await hashElement('.', options)
    return hash
  }
}