const dataSource = require('./dataSource');

const creatCart = async (productId, quantity) => {
  try {
    const carts = await dataSource.query(
      `INSERT INTO 
        carts (
        user_id, 
        product_id, 
        quantity
        ) VALUES (?,?,?)`,
      [productId, quantity]
    );

    return carts;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  creatCart,
};
