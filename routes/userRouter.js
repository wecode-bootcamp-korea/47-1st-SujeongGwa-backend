const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");

router.post("/signup", userController.signUp);
router.post("/signupType", userController.signUpType);
module.exports = router;
