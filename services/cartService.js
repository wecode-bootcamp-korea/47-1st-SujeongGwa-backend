const cartDao = require("../models/cartDao");

const getCarts = async (userId) => {
  const cartList = await cartDao.queryCartItems(userId);
  return cartList;
};

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


const patchProductsInCart = async(user_id, product_name, product_quantity) => {
    const patchProducts = await cartDao.patchProductsInCart(user_id, product_name, product_quantity);
    return patchProducts;
}
const deleteProductsInCart = async(users,goods)=>{
  const deleteProducts = await cartDao.deleteProductsInCart(users, goods);
  return deleteProducts;
}
module.exports = {
  createCart,
  getCarts,
  patchProductsInCart,
  deleteProductsInCart
}
