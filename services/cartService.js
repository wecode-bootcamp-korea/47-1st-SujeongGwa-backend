const cartDao = require('../models/cartDao');

const createCart = async (userId, productId, quantity) => {
  const product = await cartDao.getProductById(productId);
  if (product.length === 0) {
    const error = new Error('Product does not exist');
    error.statusCode = 404;
    throw error;
  }

  if (quantity <= 0) {
    const error = new Error('Quantity must be greater than 0');
    error.statusCode = 400;
    throw error;
  }

  const postProducts = await cartDao.createCart(userId, productId, quantity);
  return postProducts;
};
module.exports = {
  createCart,
};
