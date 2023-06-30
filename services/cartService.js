const { cartDao } = require('../models');
const { productDao } = require('../models');

const getCarts = async (userId) => {
  try {
    const cartList = await cartDao.getCarts(userId);
    const productIds = cartList.map((cart) => cart.productId);
    const productDetails = await productDao.getProductDetails(productIds);
    const cartItems = cartList.map((cart) => {
      const product = productDetails.find(
        (product) => product.id === cart.productId
      );
      return {
        sub_category_id: product.sub_category_id,
        name: product.name,
        surface_type_id: product.surface_type_id,
        price: product.price,
        weight: product.weight,
      };
    });
    return cartItems;
  } catch (error) {
    throw new Error('INVALID_DATA');
  }
};
module.exports = { getCarts };
