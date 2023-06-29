const bcrypt = require("bcrypt");

const { userDao } = require("../models");
const { createUser } = require("../models/userDao");
const hashPassword = async (plaintextPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plaintextPassword, saltRounds);
};

const signUp = async (type_id, name, email, password, account) => {
    const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!emailRegex.test(email)) {
        const error = new Error("INVALID_USER_em");
        error.statusCode = 400;

        throw error;
    }

    if (!passwordRegex.test(password)) {
        const error = new Error("INVALID_USERpw");
        error.statusCode = 400;

        throw error;
    }

    const hashedPassword = await hashPassword(password);
    const createUser = await userDao.createUser(type_id, name, email, hashedPassword, account);

    return createUser;
};
const userType = async (name) => {
    const userstype = await userDao.Type(name);
    return userstype;
};

module.exports = { signUp, userType };
