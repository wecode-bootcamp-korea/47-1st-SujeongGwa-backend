const { orderService } = require('../services');

const createOrder = async (req, res) => {
  const userId = req.user;
  const { address } = req.body;

  try {
    await orderService.createOrder(userId, address);
    res.status(200).json({ message: 'Success Post Orders' });
  } catch (error) {
    res.status(400).json({ message: 'INVALID USER OR INPUT' });
  }
};

module.exports = {
  createOrder,
};
