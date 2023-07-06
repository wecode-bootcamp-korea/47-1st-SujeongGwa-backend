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

const deleteProductsInCart = async (req, res) => {
  const users = req.user;
  const { productId } = req.body;

  try {
    await cartService.deleteProductsInCart(users, productId);
    res.status(200).json({ message: 'Success Delete Product' });
  } catch (error) {
    res.status(400).json({ message: 'INVALID_INPUT' });
  }
};

const modifyCarts = async (req, res) => {
  const user = req.user;
  const products = req.body.products; 
  try {
    await cartService.modifyCarts(user, products);
    res.status(200).json({ message: 'Successfully updated' });
  } catch (error) {
    res.status(400).json({ message: 'Error_INPUT' });
  }
};


module.exports = {
  createCart,
  deleteProductsInCart,
  getCartItems,
  modifyCarts,
};
