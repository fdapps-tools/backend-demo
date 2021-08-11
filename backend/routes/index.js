const express = require('express');
const router = express.Router();
const path = require('path')
const nodeController = require('../controllers/nodeController')

router.get('/', (req, res, next) => res.sendFile(path.join(__dirname + '/../../frontend/index.html')));

router.get('/nodes', nodeController.index);

router.post('/join', nodeController.store);

// GET /stats - Retorna o link do tunel
router.get('/stats', (req, res, next) => res.send({ url: req.app.get('tunnel') }));

// @todo -> Retornar o binário completo que ainda não existe
router.get('/download', (req, res, next) => { });

module.exports = router;
