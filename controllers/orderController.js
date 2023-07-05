const { orderService } = require('../services');

const createOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;
    const orderStatusEnum = Object.freeze({
      BEFORE_PURCHASE: 1,
      AFTER_PURCHASE: 2,
    });

    const orderInfo = await orderService.createOrder(
      userId,
      address,
      orderStatusEnum
    );

    res.status(200).json({ message: 'SUCCESS_CREATE_ORDER', data: orderInfo });
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
};
