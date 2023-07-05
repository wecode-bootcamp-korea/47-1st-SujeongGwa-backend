const { orderService } = require('../services');

const createOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;
    const orderInfo = await orderService.createOrder(userId, address);

    res.status(200).json({ data: orderInfo, message: 'SUCCESS_CREATE_ORDER' });
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
};
