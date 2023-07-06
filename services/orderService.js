const orderDao = require('../models/orderDao');
const userDao = require('../models/userDao');
const cartDao = require('../models/cartDao');

const createOrder = async (userId, address, orderStatusEnum) => {
  try {
    const userPoint = await userDao.myAccount(userId);
    const { cartItems } = await cartDao.getCarts(userId);

    if (cartItems.length === 0) {
      const error = new Error('Cart is empty');
      error.statusCode = 400;
      throw error;
    }

    let totalPrice = 0;
    let totalWeight = 0;

    const carts = cartItems.map((cart) => {
      const itemTotalPrice = cart.price * cart.quantity;
      const itemTotalWeight = cart.weight * cart.quantity;

      totalPrice += itemTotalPrice;
      totalWeight += itemTotalWeight;

      if (userPoint < totalPrice) {
        const error = new Error('Not enough points to complete this purchase');
        error.statusCode = 400;
        throw error;
      }

      return {
        price: cart.price,
        weight: cart.weight,
        quantity: cart.quantity,
        totalPrice: itemTotalPrice,
        totalWeight: itemTotalWeight,
      };
    });

    const postInfo = await orderDao.createOrder(
      userId,
      address,
      totalPrice,
      totalWeight,
      cartItems,
      orderStatusEnum
    );

    return postInfo;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    throw error;
  }
};

module.exports = {
  createOrder,
};
