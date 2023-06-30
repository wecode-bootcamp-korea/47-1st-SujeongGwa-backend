const express = require('express');
const { cartController } = require('../controllers');

const router = express.Router();

router.get('/getCart', cartController.getCartItems);

module.exports = router;
