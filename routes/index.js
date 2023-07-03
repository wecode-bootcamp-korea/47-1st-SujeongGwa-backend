const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const GoodRouter = require("./goodRouter");
router.use("/goods", GoodRouter)
router.use('/users', userRouter)
module.exports = router;
