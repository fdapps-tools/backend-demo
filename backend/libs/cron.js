const cron = require('node-cron');

module.exports = {
  initCron(tunnelUrl) {

    cron.schedule('* * * * *', () => nodeRepository.checkNodesIsUp());
    cron.schedule('* * * * *', () => nodeRepository.syncJoinRequests(tunnelUrl));
    
  }
}