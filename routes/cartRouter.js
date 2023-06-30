const express = require("express");
const { cartController } = require("../controllers");

const router = express.Router();

router.get("/", loginRequired, cartController.getCartItems);

module.exports = router;
