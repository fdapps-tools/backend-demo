const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const fd = require('fd');

const { initCron } = require('./libs/cron');

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

(async () => {
  await fd.startTunnel(process.env.PORT || '61635');
  console.log(`tunnel running: ${process.env.TUNNEL_URL}`)
  
  await fd.init()

  initCron()
})()

const indexRouter = require('./routes/index');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(require('path').resolve('./') + '/frontend/'))
app.use('/', indexRouter);

module.exports = app;
