const salesModel = require('../models/salesModel');

// Get all sales data
exports.getSalesData = async (req, res) => {
  try {
    const salesData = await salesModel.getSales();
    res.json(salesData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
};

// Submit a new sale
exports.submitSale = async (req, res) => {
  try {
    const newSale = req.body;
    await salesModel.addSale(newSale);
    res.status(201).json({ message: 'Sale submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit sale' });
  }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    await salesModel.deleteSale(saleId);
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sale' });
  }
};

// Update a sale
exports.updateSale = async (req, res) => {
  try {
    const saleId = req.params.id;
    const updatedSale = req.body;
    await salesModel.updateSale(saleId, updatedSale);
    res.status(200).json({ message: 'Sale updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sale' });
  }
};