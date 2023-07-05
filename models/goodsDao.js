const appDataSource = require("./dataSource");

const goodsDao = async(goodsDaoByCategoryId) => {
    try{
        const result = await appDataSource.query(
            `
            SELECT *
            FROM products
            JOIN sub_categories ON products.sub_category_id = sub_categories.id
            JOIN categories ON sub_categories.category_id = categories.id
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