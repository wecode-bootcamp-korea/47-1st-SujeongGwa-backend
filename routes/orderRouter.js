const express = require("express");
const { orderController } = require("../controllers");

const router = express.Router();

router.post("/:userId", orderController.postOrderByCart);

module.exports = router;
