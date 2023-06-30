const appDataSource = require("./dataSource");

const goodsDao = async(category_id) => {
    try{
        const result = await appDataSource.query(
            `
            SELECT products.image_url 
            FROM products
            WHERE products.sub_category_id = ?
            `,[category_id]
        )
        //console.log(result);
        const len = result.length;
        const checkArr = new Array(len).fill(0);
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