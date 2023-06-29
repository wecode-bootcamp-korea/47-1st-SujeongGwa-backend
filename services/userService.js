const { userDao } = require("../models");

const userType = async (name) => {
    const usertype = await userDao.usersType(name);
    return usertype;
};

module.exports = { userType };
