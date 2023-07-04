const { cartService } = require('../services');

const getCartItems = async (req, res) => {
  try {
    const userId = req.user;
    const result = await cartService.getCarts(userId);
    if (result.length === 0) {
      return res.status(200).json([]);
    } else {
      return res.status(200).json(result);
    }
  } catch (err) {
    console.error(err);
    return await res
      .status(err.statusCode || 400)
      .json({ message: err.message });
  }
};

module.exports = { getCartItems };
