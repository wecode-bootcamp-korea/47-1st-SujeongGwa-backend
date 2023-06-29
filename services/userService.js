const { userDao } = require("../models");

const userType = async function (name) {
    const userstype = await userDao.Type(name);
    return userstype;
};

module.exports = { userType };
