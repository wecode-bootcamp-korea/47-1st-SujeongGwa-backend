const { cartService } = require('../services');

const creatCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    await cartService.creatCart(productId, quantity);
    res.status(200).json({ message: 'SUCCES_CREATE_CART' });
  } catch (error) {
    res.status(400).json({ message: 'IVALID_INPUT' });
  }
};

module.exports = {
  creatCart,
};
