const express = require('express');
const router = express.Router();

const goodsRouter = require("./goodRouter");
const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');
<<<<<<< HEAD
router.use("/goods", goodsRouter)
=======
const cartRouter = require("./cartRouter");

>>>>>>> origin/features/cart
router.use('/carts', cartRouter);
router.use('/users', userRouter);

module.exports = router;
