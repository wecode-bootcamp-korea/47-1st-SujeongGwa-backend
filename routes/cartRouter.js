const express = require('express');
const { cartController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

const router = express.Router();

router.get('', loginRequired, cartController.getCartItems);
router.post('', loginRequired, cartController.createCart);
router.delete('', loginRequired, cartController.deleteProductsInCart);
router.patch('', loginRequired, cartController.modifyCarts);

module.exports = router;
