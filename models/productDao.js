const dataSource = require("./dataSource");

  const getProductDetails= async function (products.id) {
       try{
        const detail=await dataSource.query ( 
        `
        SELECT
        sub_category_id, 
        name, 
        surface_type_id, 
        price, 
        weight
        FROM 
        products
        WHERE products.id=?
      `,
      [products.id]
      );
       return detail;
    }catch(error){
        error = new Error('DATABASE_CONNECTION_ERROR');
        error.statusCode = 400;
        throw error;  
    };

module.exports = { getProductDetails};
