const appDataSource = require("./dataSource");

const goodsDao = async(category_id) => {
    try{
        let result = ``;
        console.log("category_id:", typeof(category_id), category_id);
        if(Number(category_id) <=9 && Number(category_id) >= 1){
            result = await appDataSource.query(
                `
                SELECT products.image_url 
                FROM products
                WHERE products.sub_category_id = ?
                `,[category_id]
            
                )
            }else{
                const error = new Error('INVALID_NUMBER_INPUT');
                error.statusCode = 400;
                throw error
                
        }
        const len = result.length;
        const urlArr = new Array(len).fill('');
        for(let i=0;i<len;i++){
            const url = "https://raw.githubusercontent.com/Teachsue/Image_URL/main/"+result[i].image_url.split('/')[7];
            urlArr[i] = url;
        }
        return urlArr;
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
        const url = "https://raw.githubusercontent.com/Teachsue/Image_URL/main/"+result[0].image_url.split('/')[7];
        return url;
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error
    }
}
module.exports = {
    goodsDao, goodsDetailDao
}