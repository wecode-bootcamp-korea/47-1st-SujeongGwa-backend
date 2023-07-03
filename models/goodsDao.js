const appDataSource = require("./dataSource");

const goodsDao = async(goodsDaoByCategoryId) => {
    try{
            //result : 상품들을 goodsDaoByCategoryId 에 따라 분류한 query
        const result = await appDataSource.query(
            `
            SELECT *
            FROM products
            WHERE products.sub_category_id = ?
            `,[goodsDaoByCategoryId]
        
            )
        if(!result){
            const error = new Error('INVALID_NUMBER_INPUT');
            error.statusCode = 400;
            throw error
        }
        return result;
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error
    }
}
const goodsDetailDao = async(name) => {
    try{
        const result = await appDataSource.query(
            `
            SELECT *
            FROM products
            WHERE products.name = ?
            `,[name]
        )
        if(!result){
            const error = new Error('INVALID_NAME_INPUT');
            error.statusCode = 400;
            throw error
        }
        return result;
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error
    }
}
module.exports = {
    goodsDao, goodsDetailDao
}