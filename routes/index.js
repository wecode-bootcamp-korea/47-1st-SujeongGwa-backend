const express = require('express');
const router = express.Router();



const userRouter = require('./userRouter');
const goodsRouter = require("./goodsRouter");

router.use('/users', userRouter);
router.use("/goods",goodsRouter)
module.exports = router;
