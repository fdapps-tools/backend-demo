const { hashElement } = require('folder-hash');
const { baseFolderHash } = require('../libs/hash');

describe('libs/hash', () => {

  it('ensure baseFolderHash return correct hash from backend root folder', async () => {
    const options = {
      folders: { exclude: ['.*', 'node_modules', 'test_coverage', 'localDB'] },
      files: { include: ['*.js', '*.json'] },
    };

    const { hash } = await hashElement('.', options)
    const hashFromLib = await baseFolderHash()

    expect(hash).toEqual(hashFromLib)
  });

})