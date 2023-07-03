const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plaintextPassword, saltRounds);
};

const signUp = async (typeId, name, email, password, account) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const accountRegex = /^[0-9]{10}$/;

  if (typeId === 1) {
    if (!emailRegex.test(email)) {
      const error = new Error('INVALID_USER_EMAIL');
      error.statusCode = 400;
      throw error;
    }

    if (!passwordRegex.test(password)) {
      const error = new Error('INVALID_USER_PASSWORD');
      error.statusCode = 400;
      throw error;
    }
  } else {
    if (account && !accountRegex.test(account)) {
      const error = new Error('INVALID_USER_ACCOUNT');
      error.statusCode = 400;
      throw error;
    }
  }
  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(
    typeId,
    name,
    email,
    hashedPassword,
    account
  );

  return createUser;
};

const signInWithEmail = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user || Object.keys(user).length === 0) {
    const error = new Error('INVALID USER');
    error.statusCode = 404;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    const error = new Error('INVALID PASSWORD');
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
    const error = new Error('INVALID USER');
    error.statusCode = 404;
    throw error;
  }

  const isMatched = await bcrypt.compare(password, accountUser[0][0].password);

  if (!isMatched) {
    const error = new Error('INVALID PASSWORD');
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
  signUp,
  signInWithEmail,
  signInWithAccount,
};
