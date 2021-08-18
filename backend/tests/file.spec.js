const { getFile, updateFile } = require('../libs/file')
const FILENAME = 'full-stack-descentralized-toolkit-nodes'

describe('libs/files', () => {

  it('ensure is possible update or create one local file localDB/*.state by name and json data', async () => {
    const jsonData = {
      "host": 'http://test-host.com',
      "applicationHash": 'simpleHash',
      "lastcheck": 2212354897461
    }
  });

  it('ensure is possible get one local file localDB/*.state by name', async () => {
    const file = await getFile(FILENAME)
    expect(file).toEqual(expect.arrayContaining(
      [expect.objectContaining({
        "host": expect.any(String),
        "applicationHash": expect.any(String),
        "lastcheck": expect.any(Number)
      })]
    ));
  });

})