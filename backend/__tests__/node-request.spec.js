const { instance } = require('../libs/node-request');

describe('libs/node-request', () => {

  it('ensure node-request instance has bypass custom header', async () => {
    const { headers } = instance().defaults

    expect(headers).toEqual(expect.objectContaining({
        "Bypass-Tunnel-Reminder": expect.any(Boolean),
        ...headers
      }
    ));
  });

})