const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signInWithEmail = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user || Object.keys(user).length === 0) {
    const error = new Error("INVALID USER");
    error.statusCode = 404;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error("INVALID PASSWORD");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return accessToken;
};

const signInWithAccount = async (account, password) => {
  const accountUser = await userDao.getUserByAccount(account);

  if (!accountUser || accountUser.length === 0 || !accountUser[0].length) {
    const error = new Error("INVALID USER");
    error.statusCode = 404;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, accountUser[0][0].password);

  if (!isMatched) {
    const error = new Error("INVALID PASSWORD");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = jwt.sign(
    { userId: accountUser[0][0].id },
    process.env.JWT_SECRET,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return accessToken;
};

module.exports = {
  signInWithEmail,
  signInWithAccount,
};
