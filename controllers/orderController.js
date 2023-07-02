const { orderService } = require("../services");

const postOrderByCart = async (req, res) => {
  const { userId } = req.userId.body;
  const { address } = req.body;

  try {
    await orderService.postOrderByCart(userId, address);
    res.status(200).json({ message: "Success Post Orders" });
  } catch (error) {
    res.status(400).json({ message: "INVALID USER OR INPUT" });
  }
};

module.exports = {
  postOrderByCart,
};
