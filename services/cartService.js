const { cartDao } = require("../models");

const getCarts = async (userId) => {
    const cartList = await cartDao.getCarts(userId);
    return cartList;
};
module.exports = { getCarts };
