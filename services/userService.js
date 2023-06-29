const userDao = require("../models/userDao");

const signInWithEmail = async (email, password) => {
  const user = await userDao.getUserByEmail(email);

  if (!user || user.length === 0) {
    const error = new Error("INVALID USER or PASSWORD");
    error.statusCode = 404;
    throw error;
  }

  if (user[0].password !== password) {
    const error = new Error("INVALID USER or PASSWORD");
    error.statusCode = 401;
    throw error;
  }

  return user[0];
};

const signInWithAccount = async (account, password) => {
  const accountUser = await userDao.getUserByAccount(account);

  if (!accountUser || accountUser.length === 0) {
    const error = new Error("INVALID USER or PASSWORD");
    error.statusCode = 404;
    throw error;
  }

  if (accountUser[0].password !== password) {
    const error = new Error("INVALID USER or PASSWORD");
    error.statusCode = 401;
    throw error;
  }

  return accountUser[0];
};

module.exports = {
  signInWithEmail,
  signInWithAccount,
};
