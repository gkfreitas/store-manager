const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product],
  );
  return insertId;
};

const update = async (productId, newProduct) => {
  const [{ insertId }] = await connection.execute(
    `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
    `,
    [newProduct, productId],
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};