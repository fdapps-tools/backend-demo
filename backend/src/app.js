const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nodeRepository = require('./repositories/nodeRepository');

const { startTunnel } = require('./libs/tunnel');
const { initCron } = require('./libs/cron');

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

(async () => {
  await startTunnel();
  console.log(`tunnel running: ${process.env.TUNNEL_URL}`)

  await nodeRepository.initNode()

  initCron()
})()

const indexRouter = require('./routes/index');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/../../frontend'))

app.use('/', indexRouter);

module.exports = app;
