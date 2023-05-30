const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
    sp.sale_id,
    s.date,
      sp.product_id,
      sp.quantity
  FROM
    StoreManager.sales as s
      JOIN
      StoreManager.sales_products as sp ON s.id = sp.sale_id`,
  );
  
  return camelize(result); 
};

const findById = async (saleId) => {
  const [product] = await connection.execute(
    `SELECT
    DISTINCT
    s.date,
      sp.product_id,
      sp.quantity
  FROM
    StoreManager.sales as s
      JOIN
      StoreManager.sales_products as sp ON sp.sale_id = ?`,
    [saleId],
  );
  return camelize(product);
};

module.exports = {
  findAll,
  findById,
};