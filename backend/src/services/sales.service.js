const { salesModel, productsModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (salesId) => {
  const sales = await salesModel.findById(salesId);
  if (sales.length === 0) return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };

  return { type: null, message: sales };
};

const createSale = async (sale) => {
  const productID = await productsModel.findAll();
  const idsProducts = productID.map((e) => e.id);
  const idsProductsSale = sale.map((e) => e.productId);
  const verifyId = idsProductsSale.every((e) => idsProducts.includes(e));
  if (!verifyId) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
  const newSaleId = await salesModel.insert(sale);
  const newSale = {
    id: newSaleId,
    itemsSold: sale,
  };
  return { type: null, message: newSale };
};
createSale([
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
]);
module.exports = {
  findAll,
  findById,
  createSale,
};