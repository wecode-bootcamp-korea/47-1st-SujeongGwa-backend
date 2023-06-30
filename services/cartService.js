const cartDao = require("../models/cartDao");

const postProductsInCart = async (user_id, product_id, quantity) => {
  const postProducts = await cartDao.postProductsInCart(
    user_id,
    product_id,
    quantity
  );

  return postProducts;
};
const patchProductsInCart = async(user_id, product_name, product_quantity) => {
    const patchProducts = await cartDao.patchProductsInCart(user_id, product_name, product_quantity);
    return patchProducts;
}
module.exports = {
  postProductsInCart, patchProductsInCart
};