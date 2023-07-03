const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/signin', userController.signIn);
router.get('/myAccount1', userController.myaccount);
module.exports = router;
