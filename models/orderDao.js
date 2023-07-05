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

    const rawOrderInfo = await queryRunner.query(
      `SELECT
      orders.order_number,
      orders.total_price,
      orders.total_weight,
      orders.address,
      users.name,
      users.email,
      order_detail.product_id,
      order_detail.quantity,
      products.name AS product_name,
      products.surface_type_id
     FROM
      orders
     JOIN
      users 
      ON 
      orders.user_id = users.id
     JOIN
      order_detail 
     ON 
      orders.id = order_detail.order_id
     JOIN
      products 
     ON 
      order_detail.product_id = products.id
     WHERE
      orders.id = ?;
    `,
      [orderId]
    );

    const orderInfo = {
      orderNumber: rawOrderInfo[0].order_number,
      totalPrice: rawOrderInfo[0].total_price,
      totalWeight: rawOrderInfo[0].total_weight,
      address: rawOrderInfo[0].address,
      name: rawOrderInfo[0].name,
      email: rawOrderInfo[0].email,
      products: [],
    };

    for (const item of rawOrderInfo) {
      orderInfo.products.push({
        productId: item.product_id,
        quantity: item.quantity,
        name: item.product_name,
        surfaceTypeId: item.surface_type_id,
      });
    }

    return orderInfo;
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