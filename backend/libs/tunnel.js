
const localtunnel = require('localtunnel');

module.exports = {
  async startLocalTunnel() {
    const tunnel = await localtunnel({ port: process.env.PORT || '61635' });
    console.log(`tunnel running: ${tunnel.url}`)
    process.env.TUNNEL_URL = tunnel.url
    
    // @todo: pensar em uma estratégia para reconexão
    tunnel.on('close', () => startLocalTunnel());
    return tunnel
  }
}