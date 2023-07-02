const dataSource = require('./dataSource');

const queryCartItems = async (userId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
      carts.product_id,
      SUM(carts.quantity) AS totalQuantity,
      products.sub_category_id,
      products.name,
      products.surface_type_id,
      products.price,
      products.weight,
      SUM(carts.quantity * products.price) AS totalPrice,
      SUM(carts.quantity * products.weight) AS totalWeight
    FROM
      carts
    JOIN
      products ON carts.product_id = products.id
    WHERE
      carts.user_id = ?
    GROUP BY
      carts.product_id,
      products.sub_category_id,
      products.name,
      products.surface_type_id,
      products.price,
      products.weight
        `,
      [userId]
    );
    return data;
  } catch (err) {
    const error = new Error('DATABASE_QUERY_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { queryCartItems, dataSource };
