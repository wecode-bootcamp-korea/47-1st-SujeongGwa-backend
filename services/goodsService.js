const goodsDao = require("../models/goodsDao"); 

const goodsService = async(category_id) => {
    return goodsDao.goodsDao(category_id);
}
const goodsDetailService = async(category_id, name) => {
    return goodsDao.goodsDetailDao(name);
   
}
module.exports = {
    goodsService, goodsDetailService
}