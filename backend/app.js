const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cron = require('node-cron');
const localtunnel = require('localtunnel');
const nodeRepository = require('./repositories/nodeRepository')

require('dotenv').config()

cron.schedule('* * * * *', () => nodeRepository.syncNodes())

async function startLocalTunnel() {
  const tunnel = await localtunnel({ port: process.env.PORT || '61635' });

  app.set('tunnel', tunnel.url);
  console.log(`tunnel running: ${tunnel.url}`)

  console.log('setting as node...')
  await nodeRepository.insertNode({ host: tunnel.url, lastcheck: Date.now() })
  console.log('setted as node!')

  tunnel.on('close', async () => {
    // @todo: pensar em uma estratégia para reconexão
    console.log(`tunnel closed, trying reconnect`)
    startLocalTunnel()
  });
  return tunnel
}

startLocalTunnel();

const indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/../frontend'))

app.use('/', indexRouter);

module.exports = app;
