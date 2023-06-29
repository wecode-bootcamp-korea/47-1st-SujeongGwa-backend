const { userService } = require("../services");

const signIn = async (req, res) => {
  const { type_id, email, account, password } = req.body;

  try {
    let accessToken;
    if (type_id === 1) {
      if (!email) {
        throw { statusCode: 400, message: "Please provide an email" };
      }
      accessToken = await userService.signInWithEmail(email, password);
    } else {
      if (!account) {
        throw { statusCode: 400, message: "Please provide an account" };
      }
      accessToken = await userService.signInWithAccount(account, password);
    }
    res.status(200).json({ message: "Login Success" });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  signIn,
};
