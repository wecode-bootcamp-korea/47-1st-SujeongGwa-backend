const { userService } = require("../services");

const signIn = async (req, res) => {
  const { type_id, email, account, password } = req.body;

  try {
    let user;
    if (type_id === 1) {
      if (!email) {
        throw { statusCode: 400, message: "Please provide an email" };
      }
      user = await userService.signInWithEmail(email, password);
    } else {
      if (!account) {
        throw { statusCode: 400, message: "Please provide an account" };
      }
      user = await userService.signInWithAccount(account, password);
    }
    res.status(200).json({ message: "Login Success" });
  } catch (error) {
    res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  signIn,
};
