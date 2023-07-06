const goodsService = require('../services/goodsService.js');
const getGoodController = async (req, res) => {
  try {
    const data = req.params.goodId;
    const returnData = await goodsService.goodsService(data);

    return await res.status(200).json({ data: returnData });
  } catch (err) {
    console.error(err);
    return await res
      .status(err.statusCode || 400)
      .json({ message: err.message });
  }
};
const getGoodsNumberController = async (req, res) => {
  try {
    const goodsType = req.params.goodId;
    const goodsName = req.params.goodName;
    const returnData = await goodsService.goodsDetailService(
      goodsType,
      goodsName
    );

    return await res.status(200).json({ data: returnData });
  } catch (err) {
    console.error(err);
    return await res
      .status(err.statusCode || 400)
      .json({ message: err.message });
  }
};
module.exports = {
  getGoodController,
  getGoodsNumberController,
};
