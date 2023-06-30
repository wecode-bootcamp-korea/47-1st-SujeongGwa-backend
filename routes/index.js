const express = require('express');
const router = express.Router();

const cartRouter = require('./cartRouter');

router.use('/users', cartRouter);

module.exports = router;
