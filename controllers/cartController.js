const { cartService } = require("../services");

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
    const {users, goods, quantity} = req.body;
    
    try{
        await cartService.patchProductsInCart(users,goods, quantity);
        res.status(200).json({message : "Success Patch Product"});
    }catch(error){
        res.status(400).json({message:"INVALID_INPUT"});
    }
}
const deleteProductsInCart = async(req,res) => {
    const users = req.user;
    const {goods} = req.body;
  
  try{
    await cartService.deleteProductsInCart(users,goods);
    res.status(200).json({message : "Success Delete Product"})
  }catch(error){
    res.status(400).json({message:"INVALID_INPUT"});
  }
}
module.exports = {
  postProductsInCart, patchProductsInCart, deleteProductsInCart
};