const dataSource = require('./dataSource');
const uuid = require('uuid');

const createOrder = async (userId, address, carts) => {
  const queryRunner = await dataSource.createQueryRunner();
  const {
    userPoint,
    total_price: totalPrice,
    total_weight: totalWeight,
  } = await calculatePriceAndWeight(userId, carts);

  try {
    await queryRunner.startTransaction();

    const newPoint = userPoint - totalPrice;

    const order_number = uuid.v4();
    const order_status_id = 2;

    const order = await queryRunner.query(
      `INSERT INTO orders(
        order_number,
        user_id,
        order_status_id,
        total_price,
        total_weight,
        address
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [order_number, userId, order_status_id, totalPrice, totalWeight, address]
    );

    const deleteResult = await queryRunner.query(
      `DELETE FROM carts WHERE user_id = ?`,
      [userId]
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

const getCarts = async (userId) => {
  const carts = await dataSource.query(
    `SELECT 
      product_id AS productId,
      quantity 
    FROM 
      carts
    WHERE 
      user_id = ?`,
    [userId]
  );
  return carts;
};

const calculatePriceAndWeight = async (userId, carts) => {
  const user = await dataSource.query(
    `SELECT 
      point
    FROM 
      users
    WHERE 
      id = ?`,
    [userId]
  );

  let total_price = 0;
  let total_weight = 0;

  for (const cart of carts) {
    const product = await dataSource.query(
      `SELECT * FROM 
          products 
        WHERE id = ?`,
      [cart.productId]
    );

    const price = product[0].price;
    const weight = product[0].weight;
    total_price += price * cart.quantity;
    total_weight += weight * cart.quantity;
  }

  return {
    userPoint: user[0].point,
    total_price,
    total_weight,
  };
};

module.exports = {
  createOrder,
  getCarts,
  calculatePriceAndWeight,
};
