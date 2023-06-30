const express = require("express");
const router = express.Router();

const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");

router.use("/orders", orderRouter);
router.use("/users", userRouter);

module.exports = router;
