const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const loginRequired = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) {
      const error = new Error('NEED_ACCESS_TOKEN');
      error.statusCode = 401;
      throw error;
    }

    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = payload.userId;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
    }
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { loginRequired };
