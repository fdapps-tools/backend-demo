const cron = require('node-cron');
const nodeRepository = require('../repositories/nodeRepository');

module.exports = {
  initCron(tunnelUrl) {
    console.log('initCron')
    cron.schedule('* * * * *', () => nodeRepository.checkNodesIsUp());
    cron.schedule('* * * * *', () => nodeRepository.syncJoinRequests(tunnelUrl));
    
  }
}