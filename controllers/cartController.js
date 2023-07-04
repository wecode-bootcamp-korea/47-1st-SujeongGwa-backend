const cartService = require('../services/cartService');

const getCartItems = async (req, res) => {
  try {
    const userId = req.user;
    const result = await cartService.getCarts(userId);

    return res.status(200).json({ data: result });
  } catch (err) {
    console.error(err);
    return await res
      .status(err.statusCode || 400)
      .json({ message: err.message });
  }
};

module.exports = { getCartItems };

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
  getCartItems,
};
