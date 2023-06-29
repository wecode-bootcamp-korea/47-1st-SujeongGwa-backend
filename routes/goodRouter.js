//routes/goodRouter.js

const express = require('express');
const {goodController} = require('../controllers');

const router = express.Router();
router.get(`/:goodId`, goodController.getGoodController);
router.get('/:goodId/:goodName', goodController.getGoodsNumController);
module.exports = router
