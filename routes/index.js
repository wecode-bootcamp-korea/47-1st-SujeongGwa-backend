const express = require('express');
const router = express.Router();

const cartRouter = require('./cartRouter');
const userRouter = require('./userRouter');

router.use('/users', cartRouter);
router.use('/users', userRouter);

module.exports = router;
