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
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: 'INVALID_USER_REQUEST' });
  }
};

module.exports = { signUp };
