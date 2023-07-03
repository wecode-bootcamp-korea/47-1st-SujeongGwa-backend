const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const cartRouter = require("./cartRouter");
router.use("/carts", cartRouter);
router.use('/users', userRouter);

module.exports = router;
