const cartService = require('../services/cartService');

const createCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user;

  try {
    await cartService.createCart(userId, productId, quantity);
    res.status(200).json({ message: 'SUCCESS_CREATE_CART' });
  } catch (error) {
    res
      .status(error.statusCode || 400)
      .json({ message: error.message || 'INVALID_INPUT' });
  }
};

module.exports = {
  createCart,
};
