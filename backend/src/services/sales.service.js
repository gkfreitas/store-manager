const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (salesId) => {
  const sales = await salesModel.findById(salesId);
  if (sales.length === 0) return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };

  return { type: null, message: sales };
};

module.exports = {
  findAll,
  findById,
};