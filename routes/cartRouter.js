const express = require("express");
const { cartController } = require("../controllers");
const { loginRequired } = require('../utils/auth');

const router = express.Router();

router.get('', loginRequired, cartController.getCartItems);
router.post('', loginRequired, cartController.createCart);
router.post("/:userId", cartController.postProductsInCart);
router.patch("", cartController.patchProductsInCart);
router.delete("", cartController.deleteProductsInCart);
module.exports = router;

