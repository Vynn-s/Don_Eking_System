const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/data', salesController.getSalesData);
router.post('/submit-sale', salesController.submitSale);
router.delete('/delete-sale/:id', salesController.deleteSale);
router.put('/update-sale/:id', salesController.updateSale);

module.exports = router;