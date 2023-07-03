const cartDao = require("../models/cartDao");

const creatCart = async (userId, productId, quantity) => {
  const postProducts = await cartDao.creatCart(
    userId,
    productId,
    quantity
  );

  return postProducts;
};

module.exports = {
  creatCart,
};
