const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('myOrderDetail', userController.myOrder);
module.exports = router;
