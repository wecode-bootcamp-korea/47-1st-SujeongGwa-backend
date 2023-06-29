const express = require("express");
const { userController } = require("../controllers");

const router = express.Router();

router.post("/Type", userController.usersType);

module.exports = router;
