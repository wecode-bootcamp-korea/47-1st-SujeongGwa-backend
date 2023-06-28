//routes/postRouter.js

const express = require('express');
const goodController = require('../controllers/goodController');

const router = express.Router();
router.get('/:categoryid',goodController.goodController);

module.exports = {
    router
}