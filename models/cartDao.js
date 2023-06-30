const dataSource = require("./dataSource");

const postProductsInCart = async (user_id, product_id, quantity) => {
  if (!user_id) {
    const error = new Error("User ID is required");
    error.statusCode = 400;
    throw error;
  }

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
    if (!user_id) {
        const error = new Error("User ID is required");
        error.statusCode = 400;
        throw error;
    }
    try{
        let cart_patch = ``;
        if(quantity == 0){
            cart_patch = await dataSource.query(
                `
                DELETE FROM carts 
                WHERE carts.user_id = ? 
                AND carts.product_id = ?
                `,[user_id, product_name]
            )
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
      const cart_delete = await dataSource.query(
        `
        DELETE FROM carts
        WHERE carts.user_id = ?
        AND carts.product_id = ?
        `,[users,goods]
      )
      return cart_delete;
    }catch(error) {
      console.error("INVALID_INPUT_DATA", error);
      error.statusCode = 400;
      throw error;
    }

}
module.exports = {
  postProductsInCart, patchProductsInCart,deleteProductsInCart
};