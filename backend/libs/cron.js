const cron = require('node-cron');
const nodeRepository = require('../repositories/nodeRepository');

module.exports = {
  initCron() {
    
    console.log('initCron')
    cron.schedule('* * * * *', () => nodeRepository.checkNodesIsUp());
    cron.schedule('* * * * *', () => nodeRepository.syncJoinRequests());
    
  }
}