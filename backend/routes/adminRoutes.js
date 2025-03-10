const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Correctly handle POST requests to /create endpoint
router.post('/create', adminController.createAdmin);

module.exports = router;