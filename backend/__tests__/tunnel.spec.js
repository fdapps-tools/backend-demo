
const { startTunnel } = require('../src/libs/tunnel')

describe('libs/tunnel', () => {

  it('ensure tunnel started and set process env attribute with url generated', async () => {
    
    const tunnel = await startTunnel()
    const { url } = tunnel
    
    expect(url).toEqual(process.env.TUNNEL_URL)
    tunnel.closed = true
    
  });

})