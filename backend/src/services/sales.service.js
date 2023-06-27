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

const deleteSale = async (id) => {
  const saleID = await salesModel.findAll();
  const idsSales = saleID.map((e) => e.saleId);
  const verifyId = idsSales.includes(Number(id));
  if (!verifyId) return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
  await salesModel.deleteS(id);
  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  createSale,
  deleteSale,
};