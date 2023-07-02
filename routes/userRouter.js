const express = require("express");
const { userController } = require("../controllers");
const { loginRequired } = require('../utils/auth');

const router = express.Router();

router.post("/signin", loginRequired, userController.signIn);

module.exports = router;
