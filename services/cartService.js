const { cartDao } = require('../models');

const getCarts = async (userId) => {
  return queryCartItems(userId);
};
module.exports = { getCarts };
