const express = require('express');
const router = express.Router();

const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');

router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);

module.exports = router;
