const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/nodeController')

router.get('/', ({ res }) => res.sendFile(require('path').resolve('./') + '/frontend/'));

router.get('/nodes', nodeController.index);
router.post('/join-request', nodeController.joinRequest);
router.post('/update-node-info', nodeController.updateNodeInfo);

router.get('/stats', (req, res, next) => res.send({ url: process.env.TUNNEL_URL }));

module.exports = router;
