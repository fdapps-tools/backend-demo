const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nodeRepository = require('./repositories/nodeRepository');

const { startLocalTunnel } = require('./libs/tunnel');
const { initCron } = require('./libs/cron');

require('dotenv').config();

(async () => {
  await startLocalTunnel();

  await nodeRepository.initNode()

  initCron()
})()

const indexRouter = require('./routes/index');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/../frontend'))

app.use('/', indexRouter);

module.exports = app;
