const dataSource = require('./dataSource');

const getCarts = async (userId) => {
  try {
    const myCart = await dataSource.query(
      `
        SELECT cartId, productId
        FROM carts
        WHERE userId = ?;
      `,
      [userId]
    );
    return myCart;
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};
module.exports = { getCarts };
