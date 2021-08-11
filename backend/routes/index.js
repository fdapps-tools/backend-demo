const express = require('express');
const router = express.Router();
const path = require('path')

// GET / - Retorna o frontend compilado
router.get('/', (req, res, next) => {
  return res.sendFile(path.join(__dirname + '/../../frontend/index.html'))
});

// @todo -> Retornar o binário completo que ainda não existe
router.get('/download', (req, res, next) => {});

// @todo -> Retornar a lista com todos os nós ativos da rede
router.get('/nodes', (req, res, next) => {});

// GET /stats - Retorna o link do tunel
router.get('/stats', (req, res, next) => {
  const tunnel = req.app.get('tunnel')
  return res.send({ url: tunnel })
});

module.exports = router;
