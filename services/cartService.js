const cartDao = require('../models/cartDao');

const getCarts = async (userId) => {
  const cartList = await cartDao.queryCartItems(userId);

  return cartList;
};

const createCart = async (userId, productId, quantity) => {
  try {
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

    const existingCart = await cartDao.queryCartItems(userId);
    const existingCartItem = existingCart.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      const cartId = existingCartItem.cartId;
      const existingQuantity = existingCartItem.quantity;
      const updatedQuantity = existingQuantity + quantity;

      await cartDao.updateCartQuantity(cartId, updatedQuantity);
      return;
    }

    await cartDao.createCart(userId, productId, quantity);
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    throw error;
  }
};

const deleteProductsInCart = async (users, goods) => {
  const deleteProducts = await cartDao.deleteProductsInCart(users, goods);

  return deleteProducts;
};

const modifyCarts = async (userId, products) => {
  const modify = await cartDao.modifyCarts(userId, products);
  return modify;
};

module.exports = {
  createCart,
  getCarts,
  deleteProductsInCart,
  modifyCarts,
};
