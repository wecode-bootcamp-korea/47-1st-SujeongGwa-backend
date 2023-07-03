const appDataSource = require("./dataSource");

const goodsDao = async(category_id) => {
    try{
        let result = ``;
        if(Number(category_id) <=9 && Number(category_id) >= 1){
            result = await appDataSource.query(
                `
                SELECT *
                FROM products
                WHERE products.sub_category_id = ?
                `,[category_id]
            
                )
            }else{
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
            SELECT products.image_url 
            FROM products
            WHERE products.name = ?
            `,[name]
        )
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