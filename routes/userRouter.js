const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
router.post("/.signUpType", userController.signUpType);

module.exports = router;
