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

module.exports = {
  postProductsInCart,
};
