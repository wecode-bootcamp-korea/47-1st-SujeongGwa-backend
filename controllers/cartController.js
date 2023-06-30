const { cartService } = require('../services');

const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await cartService.getCarts(userId);
    return res.status(200).json({ message: 'GET SUCCESS', data: result });
  } catch (error) {
    return res.status(400).json({ message: 'INVALID_DATA' });
  }
};

module.exports = { getCartItems };
