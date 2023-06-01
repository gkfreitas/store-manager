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

const updateProduct = async (id, name) => {
  const productID = await productsModel.findAll();
  const idsProducts = productID.map((e) => e.id);
  const verifyId = idsProducts.includes(Number(id));
  console.log(!verifyId);
  if (!verifyId) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
  
  await productsModel.update(id, name);
  const newProduct = await productsModel.findById(id);
  
  return { type: null, message: newProduct };
};

updateProduct('1', { name: 'blablala' });

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};