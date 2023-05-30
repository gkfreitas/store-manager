const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productsId) => {
  const products = await productsModel.findById(productsId);
  if (!products) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };

  return { type: null, message: products };
};

module.exports = {
  findAll,
  findById,
};