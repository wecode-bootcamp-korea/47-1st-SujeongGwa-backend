const express = require("express");
const router = express.Router();

const goodsRouter = require("./goodsRouter");
const userRouter = require("./userRouter");
router.use("/goods",goodsRouter)
router.use("/users", userRouter);

module.exports = router;
