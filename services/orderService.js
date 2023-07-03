const orderDao = require("../models/orderDao");

const createOrder = async (userId, address) => {
  try {
    const postOrder = await orderDao.createOrder(userId, address);
    return postOrder;
  } catch (error) {
    console.error("INVALID_INPUT_DATA", error);
    throw error;
  }
};

module.exports = {
  createOrder,
};
