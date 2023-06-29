const { userDao } = require("../models");

const userTypeId = async (name) => {
    const usertype = await userDao.Type(name);
    return usertype;
};

module.exports = { userTypeId };
