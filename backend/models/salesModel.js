const salesData = [];

// Get all sales
exports.getSales = async () => {
  return salesData;
};

// Add a new sale
exports.addSale = async (sale) => {
  salesData.push(sale);
};

// Delete a sale
exports.deleteSale = async (id) => {
  const index = salesData.findIndex((sale) => sale.id === id);
  if (index !== -1) {
    salesData.splice(index, 1);
  }
};

// Update a sale
exports.updateSale = async (id, updatedSale) => {
  const index = salesData.findIndex((sale) => sale.id === id);
  if (index !== -1) {
    salesData[index] = updatedSale;
  }
};