const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/information', loginRequired, userController.getUserInfomation);

module.exports = router;
