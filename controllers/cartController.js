const { cartService } = require('../services');

const getCartItems = async (req, res) => {
  try {
    const userId = 1;

    const result = await cartService.getCarts(userId);
    return res.status(200).json(result);
  } catch (error) {
    const errorMessage = 'DATABASE_QUERY_ERROR2';
    return res.status(500).json({
      error: errorMessage,
    });
  }
};

module.exports = { getCartItems };
