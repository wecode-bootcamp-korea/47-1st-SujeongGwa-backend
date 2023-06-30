const cartDao = require("../models/cartDao");

const postProductsInCart = async (user_id, product_id, quantity) => {
  const postProducts = await cartDao.postProductsInCart(
    user_id,
    product_id,
    quantity
  );

  return postProducts;
};

module.exports = {
  postProductsInCart,
};
