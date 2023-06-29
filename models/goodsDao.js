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
            //console.log(result[i].image_url);
            let check_int = 0;
            let randomInt = -1;
            while(check_int != 1){
                randomInt = Math.floor(Math.random() * len) ;
                if(randomInt == len){
                    randomInt -= 1;
                }
                if(checkArr[randomInt] == 1)continue;
                checkArr[randomInt] = 1;
                check_int = 1;
            }
            const url = "https://raw.githubusercontent.com/Teachsue/Image_URL/main/"+result[randomInt].image_url.split('/')[7];
            urlArr[i] = url;
        }
        return urlArr;
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
    }
}

module.exports = {
    goodsDao
}