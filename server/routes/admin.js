const express = require('express');
const router = express.Router();
const { getCrossDatabaseStats } = require('../controllers/adminController');

// Route showing how admin dashboard has access to all three databases
router.get('/stats', getCrossDatabaseStats);

module.exports = router;
