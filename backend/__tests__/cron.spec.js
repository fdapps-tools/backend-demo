const { initCron } = require('../libs/cron')
const cron = require('node-cron');

describe('libs/cron', () => {

  it('ensure initCron is scheduling tasks', async () => {

    initCron()
    const tasks = cron.getTasks()
    const hasTasks = !!tasks.length

    expect(hasTasks).toEqual(true)

    tasks.map(task => task.stop())
  });

})