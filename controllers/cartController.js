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

module.exports = {
  postProductsInCart,
};
