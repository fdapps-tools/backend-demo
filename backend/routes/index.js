const express = require('express');
const router = express.Router();
const path = require('path')
const nodeController = require('../controllers/nodeController')

router.get('/', ({ res }) => res.sendFile(path.join(__dirname + '/../../frontend/index.html')));

router.get('/nodes', nodeController.index);
router.post('/join-request', nodeController.joinRequest);
router.post('/update-node-info', nodeController.updateNodeInfo);

router.get('/stats', (req, res, next) => res.send({ url: req.app.get('tunnel') }));

module.exports = router;
