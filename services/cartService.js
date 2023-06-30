const { cartDao } = require('../models');

const getCarts = async (userId) => {
  const cartList = await cartDao.queryCartItems(userId);
};
module.exports = { getCarts };
