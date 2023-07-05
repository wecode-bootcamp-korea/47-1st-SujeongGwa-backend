const orderDao = require('../models/orderDao');
const userDao = require('../models/userDao');
const cartDao = require('../models/cartDao');

const createOrder = async (userId, address, orderStatusEnum) => {
  try {
    const userPoint = await userDao.myAccount(userId);
    const { carts } = await cartDao.getCarts(userId);

    if (carts.length === 0) {
      const error = new Error('Cart is empty');
      error.statusCode = 400;
      throw error;
    }

    const cartItems = carts.map((cart) => {
      const price = cart.price;
      const weight = cart.weight;
      const quantity = cart.quantity;
      const totalPrice = price * quantity;
      const totalWeight = weight * quantity;

      if (userPoint < totalPrice) {
        const error = new Error('Not enough points to complete this purchase');
        error.statusCode = 400;
        throw error;
      }
      return {
        price,
        weight,
        quantity,
        totalPrice,
        totalWeight,
      };
    });

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    const totalWeight = cartItems.reduce(
      (acc, item) => acc + item.totalWeight,
      0
    );

    const postInfo = await orderDao.createOrder(
      userId,
      address,
      totalPrice,
      totalWeight,
      carts,
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
