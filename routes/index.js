const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const paymentRouter = require('./paymentRouter');

router.use('/users', userRouter);
router.use('/users', paymentRouter);
module.exports = router;
