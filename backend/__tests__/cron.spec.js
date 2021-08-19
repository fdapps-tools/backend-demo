const { initCron } = require('../libs/cron')
const cron = require('node-cron');

describe('libs/cron', () => {

  it('ensure initCron is scheduling tasks', async () => {

    initCron()
    const hasTasks = !!cron.getTasks().length
    expect(hasTasks).toEqual(true)
    // @todo: finalizar cron antes de sair do test para não dar warning detectOpenHandles
  });

})