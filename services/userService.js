const bcrypt = require("bcrypt");

const { userDao } = require("../models");
const hashPassword = async (plaintextPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plaintextPassword, saltRounds);
};

const signUp = async (typeId, name, email, password, account) => {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const accountRegex = /^[0-9]{10}$/;

    if (typeId === 1) {
        if (!emailRegex.test(email)) {
            const error = new Error("INVALID_USER_EMAIL");
            error.statusCode = 400;
            throw error;
        }

        if (!passwordRegex.test(password)) {
            const error = new Error("INVALID_USER_PASSWORD");
            error.statusCode = 400;
            throw error;
        }
    } else {
        if (account && !accountRegex.test(account)) {
            const error = new Error("INVALID_USER_ACCOUNT");
            error.statusCode = 400;
            throw error;
        }
    }
    const hashedPassword = await hashPassword(password);
    const createUser = await userDao.createUser(typeId, name, email, hashedPassword, account);

    return createUser;
};

module.exports = { signUp };
