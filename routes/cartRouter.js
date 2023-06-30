const express = require('express');
const { cartController } = require('../controllers');

const router = express.Router();

router.get('/cartlist', cartController.getCartItems);

module.exports = router;
