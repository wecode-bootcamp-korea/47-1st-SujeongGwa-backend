const getDataSource = require('./dataSource');
const uuid = require('uuid');

const createOrder = async (user_id, address) => {
  const queryRunner = await getDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const user = await queryRunner.query(
      `SELECT 
       point 
      FROM 
       users 
      WHERE id = ?`,
      [user_id]
    );
    const userPoint = user[0].point;

    const carts = await queryRunner.query(
      `SELECT * FROM 
        carts 
      WHERE 
        user_id = ?`,
      [user_id]
    );

    if (carts.length === 0) {
      throw new Error('Cart is empty');
    }

    let total_price = 0;
    let total_weight = 0;
    for (const cart of carts) {
      const product = await queryRunner.query(
        `SELECT * FROM 
          products 
        WHERE id = ?`,
        [cart.product_id]
      );

      total_price += product[0].price * cart.quantity;
      total_weight += product[0].weight * cart.quantity;
    }

    if (userPoint < total_price) {
      const error = new Error('Not enough points to complete this purchase');
      error.statusCode = 400;
      throw error;
    }

    const newPoint = userPoint - total_price;
    await queryRunner.query(
      `
    UPDATE 
     users 
    SET
     point = ? 
    WHERE 
     id = ?`,
      [newPoint, user_id]
    );

    const order_number = uuid.v4();
    const order_status_id = 1;

    const order = await queryRunner.query(
      `INSERT INTO orders(
        order_number,
        user_id,
        order_status_id,
        total_price,
        total_weight,
        address
      )VALUES(?,?,?,?,?,?)`,
      [
        order_number,
        user_id,
        order_status_id,
        total_price,
        total_weight,
        address,
      ]
    );

    await queryRunner.query(
      `DELETE FROM 
        carts
      WHERE 
       user_id = ?`,
      [user_id]
    );

    await queryRunner.commitTransaction();

    return order;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  createOrder,
};
