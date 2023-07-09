const orderDao = require('../models/orderDao');
const userDao = require('../models/userDao');
const cartDao = require('../models/cartDao');

const createOrder = async (userId, address, orderStatusEnum) => {
  try {
    console.log("userID:",userId);
    console.log("address:",address);
    console.log("orderStatusEnum:",orderStatusEnum);
    const userPoint = await userDao.myAccount(userId);
    const { cartItems } = await cartDao.getCarts(userId);
    const point = userPoint[0].point
    if (cartItems.length === 0) {
      const error = new Error('Cart is empty');
      error.statusCode = 400;
      throw error;
    }

    let totalPrice = 0;
    let totalWeight = 0;
    console.log(cartItems);
    let cartItem = cartItems.map((cart, index) => {
      console.log('cart',cart);
      let itemTotalPrice = Number(cart.price) * cart.quantity;
      let itemTotalWeight = cart.weight * cart.quantity;

      totalPrice += itemTotalPrice;
      totalWeight += itemTotalWeight;
      if (point < totalPrice) {
        console.log("수량이 너무 많습니다.");
        const error = new Error('Not enough points to complete this purchase');
        error.statusCode = 402;
        throw error;
      }
      if(index === cartItems.length - 1 ){
        return {
          price: cart.price,
          weight: cart.weight,
          quantity: cart.quantity,
          totalPrice: itemTotalPrice,
          totalWeight: itemTotalWeight,
        };
      }
    });
    console.log('cartItem:',cartItem);
    const postInfo = await orderDao.createOrder(
      userId,
      address,
      totalPrice,
      totalWeight,
      cartItems,
      orderStatusEnum
    );
    console.log('postInfo : ',postInfo);
    return postInfo;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    throw error;
  }
};

module.exports = {
  createOrder
};
