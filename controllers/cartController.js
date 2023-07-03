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

const postProductsInCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    await cartService.postProductsInCart(user_id, product_id, quantity);
    res.status(200).json({ message: "Success Post Products" });
  } catch (error) {
    res.status(400).json({ message: "IVALID_INPUT" });
  }
};
const patchProductsInCart = async (req,res) => {
    const {goods, quantity} = req.body;
    const users = req.users;
    
    try{
        await cartService.patchProductsInCart(users,goods, quantity);
        res.status(200).json({message : "Success Patch Product"});
    }catch(error){
        res.status(400).json({message:"INVALID_INPUT"});
    }
}
const deleteProductsInCart = async(req,res) => {
    const users = req.users;
    const {goods} = req.body;
  
  try{
    await cartService.deleteProductsInCart(users,goods);
    res.status(200).json({message : "Success Delete Product"})
  }catch(error){
    res.status(400).json({message:"INVALID_INPUT"});
  }
}
module.exports = {
    createCart, postProductsInCart, patchProductsInCart, deleteProductsInCart
};

