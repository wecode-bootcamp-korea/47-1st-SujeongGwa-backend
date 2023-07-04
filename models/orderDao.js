const dataSource = require('./dataSource');
const uuid = require('uuid');

const createOrder = async (userId, address, totalPrice, totalWeight, carts) => {
  const queryRunner = await dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const updatePoints = await queryRunner.query(
      `UPDATE 
        users 
      SET 
        point = point - ? 
      WHERE 
        id = ?`,
      [totalPrice, userId]
    );

    const orderNumber = uuid.v4();
    const orderStatusId = 2;

    const order = await queryRunner.query(
      `INSERT INTO orders(
        order_number,
        user_id,
        order_status_id,
        total_price,
        total_weight,
        address
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [orderNumber, userId, orderStatusId, totalPrice, totalWeight, address]
    );

    const orderId = order.insertId;

    for (const cart of carts) {
      await queryRunner.query(
        `INSERT INTO order_detail(
          order_id,
          product_id,
          quantity
        ) VALUES (?, ?, ?)`,
        [orderId, cart.product_id, cart.quantity]
      );
    }

    const deleteResult = await queryRunner.query(
      `DELETE FROM 
        carts 
      WHERE 
        user_id = ?`,
      [userId]
    );

    await queryRunner.commitTransaction();
   const orderInfo = await queryRunner.query(
    `SELECT product_id, 
    FROM orders
   )
    return order;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
};

const getCarts = async (userId, carts) => {
  const [user, cartItems] = await Promise.all([
    dataSource.query(
      `SELECT 
        point 
      FROM 
        users 
      WHERE 
        id = ?`,
      [userId]
    ),
    dataSource.query(
      `SELECT 
        carts.product_id,
        products.id,
        products.price,
        products.weight,
        carts.quantity 
      FROM 
        carts
      JOIN
        products
      ON
        carts.product_id = products.id
      WHERE 
        user_id = ?`,
      [userId]
    ),
  ]);

  return {
    userPoint: user[0].point,
    carts: cartItems,
  };
};

module.exports = {
  createOrder,
  getCarts,
};
