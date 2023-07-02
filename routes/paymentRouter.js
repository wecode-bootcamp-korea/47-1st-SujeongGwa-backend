const express = require('express');
const { paymentController } = require('../controllers');

const router = express.Router();

router.get('/getmypoint', paymentController.mypoint);
module.exports = router;
