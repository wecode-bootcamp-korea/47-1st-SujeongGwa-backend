const { userService } = require('../services');

const signUp = async (req, res) => {
  try {
    const { type_id, name, email, password, account } = req.body;

    if (!name || !email || !password) {
      const error = new Error(
        'KEY_ERROR: Missing required fields: name, email, password.'
      );
      error.statusCode = 400;
      throw error;
    }

    if (type_id !== 1 && !account) {
      const error = new Error('KEY_ERROR: Missing required field.');
      error.statusCode = 400;
      throw error;
    }

    await userService.signUp(type_id, name, email, password, account);

    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: 'INVALID_USER_REQUEST' });
  }
};

const signIn = async (req, res) => {
  const { type_id, email, account, password } = req.body;

  try {
    let accessToken;
    const userTypeEnum = Object.freeze({
      NORMAL_USER: 1,
      BUSINESS_OWNER: 2,
      CORPORATION: 3,
    });

    if (type_id === userTypeEnum.NORMAL_USER) {
      accessToken = await userService.signInWithEmail(email, password);
    } else {
      accessToken = await userService.signInWithAccount(account, password);
    }

    res.status(200).json({ message: 'Login Success', accessToken });
  } catch (error) {
    res.status(error.statusCode || 401).json({ message: error.message });
  }
};
module.exports = {
  signUp,
  signIn,
};
