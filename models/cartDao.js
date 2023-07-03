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
        let cart_patch = ``;
        if(quantity == 0){
            console.error("0개 미만으로는 숫자를 변경할 수 없습니다.")
            error.statusCode = 400;
            throw error;
        }else{
            cart_patch = await dataSource.query(
                `
                UPDATE 
                carts 
                SET quantity = ?
                WHERE carts.user_id = ? 
                AND carts.product_id = ?;
                `,[quantity, user_id, product_name]
            )}
            return cart_patch;
    }catch (error) {
        console.error("INVALID_INPUT_DATA", error);
        error.statusCode = 400;
        throw error;
        }
}
const deleteProductsInCart = async(users,goods)=>{
    if (!users) {
    const error = new Error("User ID is required");
    error.statusCode = 400;
    throw error;
    }try{
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