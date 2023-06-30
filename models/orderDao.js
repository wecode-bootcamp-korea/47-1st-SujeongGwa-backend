const dataSource = require("./dataSource");

const uuid = require("uuid");
const postOrderByCart = async (user_id, address) => {
  try {
    const order_number = uuid.v4();

    const order_status_id = 2;

    const carts = await dataSource.query(
      `SELECT * FROM 
         carts 
        WHERE 
         user_id = ?`,
      [user_id]
    );

    let total_price = 0;
    let total_weight = 0;

    for (const cart of carts) {
      const product = await dataSource.query(
        `SELECT * FROM 
          products 
         WHERE 
          id = ?`,
        [cart.product_id]
      );

      total_price += product[0].price * cart.quantity;
      total_weight += product[0].weight * cart.quantity;
    }

    const order = await dataSource.query(
      `INSERT INTO orders(
        order_number,
        user_id,
        order_status_id,
        total_price,
        total_weight,
        address
      ) VALUES(?,?,?,?,?,?)`,
      [
        order_number,
        user_id,
        order_status_id,
        total_price,
        total_weight,
        address,
      ]
    );

    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postOrderByCart,
};
