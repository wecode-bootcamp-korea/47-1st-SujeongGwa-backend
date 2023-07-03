const goodsService = require("../services/goodsService.js");
const getGoodController = async(req,res) => {
    try{
        const data = req.params.goodId;
        const return_data = await goodsService.goodsService(data);
        return await res.status(200).json({data : return_data});
    }catch(err){
        console.error(err);
        return await res.status(err.statusCode || 400).json({ message : err.message});
    }
}
const getGoodsNumberController = async(req,res) => {
    try{
        const goods_type = req.params.goodId;
        const goods_name = req.params.goodName;
        const return_data = await goodsService.goodsDetailService(goods_type,goods_name);
        return await res.status(200).json({data : return_data});
    }catch(err){
        console.error(err);
        return await res.status(err.statusCode || 400).json({message : err.message});
    }
}
module.exports = {
    getGoodController,getGoodsNumberController
}