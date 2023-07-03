const dataSource = require("./dataSource");

const postProductsInCart = async (user_id, product_id, quantity) => {
    try {
        const carts = await dataSource.query(
          `INSERT INTO 
            carts (
            user_id, 
            product_id, 
            quantity
            ) VALUES (?,?,?)`,
          [user_id, product_id, quantity]
        );
    
        return carts;
      } catch (error) {
        console.error("INVALID_INPUT_DATA", error);
        error.statusCode = 400;
        throw error;
      }
    };
const patchProductsInCart = async(user_id,product_name, quantity)=>{
    try{
        if(quantity == 0){
            console.error("0개 미만으로는 숫자를 변경할 수 없습니다.",error)
            error.statusCode = 400;
            throw error;
        }
      let cart_patch = await dataSource.query(
          `
          UPDATE 
          carts 
          SET quantity = ?
          WHERE carts.user_id = ? 
          AND carts.product_id = ?;
          `,[quantity, user_id, product_name]
      )
      return cart_patch;
          
    }catch (error) {
        const err = new Error("INVALID_INPUT_DATA");
        err.statusCode = 400;
        throw err;
        }
}
const deleteProductsInCart = async(users,goods)=>{
    try{
    await dataSource.query(
        `
        DELETE FROM carts
        WHERE carts.user_id = ?
        AND carts.product_id = ?
        `,[users,goods]
    )
    const message = 'SUCCESS DELETE';
    return message;
    }catch(error) {
    console.error("INVALID_INPUT_DATA", error);
    error.statusCode = 400;
    throw error;
    }

}
module.exports = {
postProductsInCart, patchProductsInCart,deleteProductsInCart
};