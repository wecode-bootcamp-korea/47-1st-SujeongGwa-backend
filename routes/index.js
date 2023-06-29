const express = require('express')
const router = express.Router();

const GoodRouter = require("./goodRouter");

router.use("/goods", GoodRouter)

module.exports = router
