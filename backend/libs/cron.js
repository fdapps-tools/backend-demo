const cron = require('node-cron');
const nodeRepository = require('../repositories/nodeRepository');

module.exports = {
  initCron() {
    
    cron.schedule('* * * * *', () => nodeRepository.checkNodesIsUp());
    cron.schedule('* * * * *', () => nodeRepository.syncJoinRequests());
    
  }
}