const dataSource = require('./dataSource');
const uuid = require('uuid');

const createOrder = async (
  userId,
  address,
  totalPrice,
  totalWeight,
  carts,
  orderStatusEnum
) => {
  const queryRunner = await dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    const orderNumber = uuid.v4();

    const order = await queryRunner.query(
      `INSERT INTO orders(
        order_number,
        user_id,
        order_status_id,
        total_price,
        total_weight,
        address
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        userId,
        orderStatusEnum.BEFORE_PURCHASE,
        totalPrice,
        totalWeight,
        address,
      ]
    );

    const orderId = order.insertId;

    const queryValues = carts.map((cart) => [
      orderId,
      cart.product_id,
      cart.quantity,
    ]);

    await queryRunner.query(
      `INSERT INTO order_detail(
        order_id,
        product_id,
        quantity
      ) VALUES ?`,
      [queryValues]
    );
    const updatePoints = await queryRunner.query(
      `UPDATE 
        users 
      SET 
        point = point - ? 
      WHERE 
        id = ?`,
      [totalPrice, userId]
    );

    const afterPurchase = await queryRunner.query(
      `UPDATE  
        orders
      SET 
       order_status_id = ?
      WHERE 
        id = ?`,
      [orderStatusEnum.AFTER_PURCHASE, orderId]
    );

    const deleteResult = await queryRunner.query(
      `DELETE FROM 
        carts 
      WHERE 
        user_id = ?`,
      [userId]
    );

    await queryRunner.commitTransaction();

    const [rawOrderInfo] = await queryRunner.query(
      `SELECT
        orders.id AS orderId,
        orders.order_number AS orderNumber,
        orders.total_price AS totalPrice,
        orders.total_weight AS totalWeight,
        orders.address,
        users.name AS name,
        users.email AS email,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'productId', order_detail.product_id,
          'quantity', order_detail.quantity,
          'productName', products.name,
          'surfaceTypeId', products.surface_type_id
        )
      ) AS products
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
      orders.id = ?
    GROUP BY
      orders.id;
    `,
      [orderId]
    );

    const orderInfo = {
      orderId: rawOrderInfo.orderId,
      orderNumber: rawOrderInfo.orderNumber,
      totalPrice: rawOrderInfo.totalPrice,
      totalWeight: rawOrderInfo.totalWeight,
      address: rawOrderInfo.address,
      name: rawOrderInfo.name,
      email: rawOrderInfo.email,
      products: rawOrderInfo.products,
    };

    return orderInfo;
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
