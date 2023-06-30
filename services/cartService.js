const { cartDao } = require('../models');

const getCarts = async (userId) => {
  const cartList = await cartDao.queryCartItems(userId);
  return cartList;
};
module.exports = { getCarts };
