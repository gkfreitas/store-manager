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

const createProduct = async (name) => {
  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.findById(newProductId);
  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};