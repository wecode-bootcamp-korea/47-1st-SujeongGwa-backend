const orderDao = require("../models/orderDao");

const postOrderByCart = async (user_id, address) => {
  try {
    const postOrder = await orderDao.postOrderByCart(user_id, address);
    return postOrder;
  } catch (error) {
    console.error("INVALID_INPUT_DATA", error);
    throw error;
  }
};

module.exports = {
  postOrderByCart,
};
