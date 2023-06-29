//routes/goodRouter.js

const express = require('express');
const {goodController} = require('../controllers');

const router = express.Router();
router.get(`/:goodId`, goodController.getGoodController);

module.exports = router
