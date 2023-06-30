const { cartService } = require("../services");

const getCartItems = async function (req, res) {
    const userId = req.user.id;
    const result = await cartService.getCarts(userId);
    return res.status(200).json({ message: "GET SUCCESS", data: result });
};

module.exports = { getCartItems };
