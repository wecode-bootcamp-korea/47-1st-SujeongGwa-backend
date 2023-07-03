const { cartService } = require('../services');

const getCartItems = async (req, res) => {
  try {
    const userId = 9;
    const result = await cartService.getCarts(userId);
    if (result.length === 0) {
      return res.status(200).json({ message: '카트가 비어있습니다.' });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Database error' });
  }
};

module.exports = { getCartItems };
