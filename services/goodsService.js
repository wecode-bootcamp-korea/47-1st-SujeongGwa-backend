const goodsDao = require('../models/goodsDao');

const goodsService = async (categoryId) => {
  return goodsDao.goodsDao(categoryId);
};
const goodsDetailService = async (categoryId, name) => {
  return goodsDao.goodsDetailDao(name);
};
module.exports = {
  goodsService,
  goodsDetailService,
};
