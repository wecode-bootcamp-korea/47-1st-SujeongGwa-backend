const express = require('express')
const router = express.Router();

const goodsRouter = require("./goodsRouter");

router.use("/goods",goodsRouter)
module.exports = router
