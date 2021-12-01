const cron = require('node-cron');
const fd = require('fd');

module.exports = {
  initCron() {

    cron.schedule('* * * * *', () => fd.checkNodesIsUp());
    cron.schedule('* * * * *', () => fd.syncJoinRequests());

  }
}