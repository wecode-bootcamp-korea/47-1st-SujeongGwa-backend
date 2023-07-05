const express = require('express');
const router = express.Router();

const goodsRouter = require("./goodRouter");
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');

router.use("/goods", goodsRouter)
router.use('/carts', cartRouter);
router.use('/users', userRouter);

module.exports = router;
