const { cartService } = require('../services');

const getCartItems = async (req, res) => {
  try {
    const userId = req.query.userId;

    const queryCartItems = await cartService.getCarts(userId);
    return res.status(200).json({
      data: queryCartItems,
    });
  } catch (error) {
    const errorMessage = 'DATABASE_QUERY_ERROR';
    return res.status(500).json({
      error: errorMessage,
    });
  }
};

module.exports = { getCartItems };
