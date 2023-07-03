const express = require('express');
const { cartController } = require('../controllers');

const router = express.Router();

router.post('', cartController.creatCart);

module.exports = router;
