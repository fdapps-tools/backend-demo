const express = require('express');
const router = express.Router();
const fd = require('fd')

/**
 * Route to delivery static frontend
 */
router.get('/', ({ res }) => res.sendFile(require('path').resolve('./') + '/frontend/'));

/**
 * Inject fdApps routes on express router
 * Routes: GET /starts, GET /nodes, POST /join-request, POST /update-node-info
 */
fd.attachRoutes(router)

module.exports = router;
