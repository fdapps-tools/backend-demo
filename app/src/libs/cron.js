const cron = require('node-cron');
const nodeManager = require('node-manager');

module.exports = {
  initCron() {

    cron.schedule('* * * * *', () => nodeManager.checkNodesIsUp());
    cron.schedule('* * * * *', () => nodeManager.syncJoinRequests());

  }
}