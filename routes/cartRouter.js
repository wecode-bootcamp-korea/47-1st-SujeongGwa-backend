const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.post("/:userId", cartController.postProductsInCart);
router.patch("/:userId", cartController.patchProductsInCart);
module.exports = router;