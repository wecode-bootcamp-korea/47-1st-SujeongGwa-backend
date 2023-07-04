const orderDao = require('../models/orderDao');

const createOrder = async (userId, address) => {
  try {
    const { userPoint, carts } = await orderDao.getCarts(userId);

    if (carts.length === 0) {
      const error = new Error('Cart is empty');
      error.statusCode = 400;
      throw error;
    }

    let totalPrice = 0;
    let totalWeight = 0;

    for (const cart of carts) {
      const price = cart.price;
      const weight = cart.weight;
      totalPrice += price * cart.quantity;
      totalWeight += weight * cart.quantity;
    }

    if (userPoint < totalPrice) {
      const error = new Error('Not enough points to complete this purchase');
      error.statusCode = 400;
      throw error;
    }

    const postOrder = await orderDao.createOrder(
      userId,
      address,
      totalPrice,
      totalWeight,
      carts
    );

    return postOrder;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    throw error;
  }
};

module.exports = {
  createOrder,
};
