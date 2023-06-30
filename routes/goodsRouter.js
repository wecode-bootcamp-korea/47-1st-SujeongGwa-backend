const express = require('express');
const {goodsController} = require('../controllers');

const router = express.Router();
router.get('/category/:goodsId', goodsController.getGoodsController);
router.get('/name/:goodsName', goodsController.getGoodsNumController);
module.exports = router