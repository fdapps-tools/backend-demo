
let tryNumber = 0

module.exports = {

  async startTunnel() {
    const availables = [
      { name: 'localTunnel', start: require('localtunnel') },
    ]
    
    const config = { port: process.env.PORT || '61635' }
    
    const tunnel = await availables[tryNumber].start(config);
    process.env.TUNNEL_URL = tunnel.url
    
    tunnel.on('close', () =>{
      tryNumber = (availables[tryNumber+1]) ? tryNumber += 1 : 0
      startTunnel()
    });

    return tunnel
  },

}