const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.post("/:userId", cartController.postProductsInCart);
router.patch("", cartController.patchProductsInCart);
router.delete("", cartController.deleteProductsInCart);
module.exports = router;