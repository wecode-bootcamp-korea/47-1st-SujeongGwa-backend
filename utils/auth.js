const jwt = require("jsonwebtoken");
const { userService } = require("../services");

const loginRequired = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      const error = new Error("NEED_ACCESS_TOKEN");
      error.statusCode = 401;
      throw error;
    }

    const payload = jwt.verify(accessToken, process.env.JWT_SECRET);

    let user;
    if (payload.email) {
      user = await userService.signInWithEmail(
        payload.email,
        req.body.password
      );
    } else if (payload.account) {
      user = await userService.signInWithAccount(
        payload.account,
        req.body.password
      );
    }

    if (!user) {
      const error = new Error("USER_DOES_NOT_EXIST");
      error.statusCode = 404;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
    }
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { loginRequired };
