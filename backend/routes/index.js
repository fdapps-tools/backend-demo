const express = require('express');
const router = express.Router();
const path = require('path')
const nodeController = require('../controllers/nodeController')

router.get('/', (req, res, next) => res.sendFile(path.join(__dirname + '/../../frontend/index.html')));
router.get('/nodes', nodeController.index);
router.post('/join', nodeController.store);
router.get('/stats', (req, res, next) => res.send({ url: req.app.get('tunnel') }));

module.exports = router;
