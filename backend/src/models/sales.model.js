const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
    sp.sale_id as saleId,
    s.date,
      sp.product_id as productId,
      sp.quantity
  FROM
    StoreManager.sales as s
      JOIN
      StoreManager.sales_products as sp ON s.id = sp.sale_id`,
  );
  return result;
};

const findById = async (saleId) => {
  const [product] = await connection.execute(
    `SELECT
    DISTINCT
    s.date,
      sp.product_id as productId,
      sp.quantity
  FROM
    StoreManager.sales as s
      JOIN
      StoreManager.sales_products as sp ON sp.sale_id = ?`,
    [saleId],
  );
  return product;
};

const insert = async (sales) => {
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [date],
  );

  sales.forEach(async (e) => {
    const insertWithId = await connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [insertId, e.productId, e.quantity],
    );
    return insertWithId;
  });

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};