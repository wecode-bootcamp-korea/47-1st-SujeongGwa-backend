const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const orderRouter = require('./orderRouter');

router.use('/orders', orderRouter);
router.use('/users', userRouter);

module.exports = router;
