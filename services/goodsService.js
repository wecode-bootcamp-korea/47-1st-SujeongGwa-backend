const goodsDao = require("../models/goodsDao"); 

const goodsService = async(category_id) => {
    try{
        return goodsDao.goodsDao(category_id);
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
const goodsDetailService = async(name) => {
    try{
        return goodsDao.goodsDetailDao(name);
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}
module.exports = {
    goodsService, goodsDetailService
}