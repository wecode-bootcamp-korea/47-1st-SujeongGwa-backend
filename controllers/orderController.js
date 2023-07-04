const { orderService } = require('../services');

const createOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;

    await orderService.createOrder(userId, address);
    res.status(200).json(postOrder);
  } catch (error) {
    res.status(400).json({ message: 'INVALID USER OR INPUT' });
  }
};

module.exports = {
  createOrder,
};
