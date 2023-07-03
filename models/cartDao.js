const dataSource = require('./dataSource');

const createCart = async (userId, productId, quantity) => {
  try {
    const carts = await dataSource.query(
      `INSERT INTO 
        carts (
        user_id,
        product_id, 
        quantity
        ) VALUES (?,?,?)`,
      [userId, productId, quantity]
    );

    return carts;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    error.statusCode = 400;
    throw error;
  }
};

const getProductById = async (productId) => {
  const product = await dataSource.query(
    `SELECT * FROM products WHERE id = ?`,
    [productId]
  );

  return product;
};

module.exports = {
  createCart,
  getProductById,
};
