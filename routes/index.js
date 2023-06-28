const express = require('express')
const router = express.Router();
const goodRouter = require("./goodRouter");
router.use("/goods",goodRouter.router);

module.exports = router
