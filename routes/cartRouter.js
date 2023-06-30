const express = require('express');
const { cartController } = require('../controllers');

const router = express.Router();

router.get('/cart/:userId', cartController.getCartItems);

module.exports = router;
