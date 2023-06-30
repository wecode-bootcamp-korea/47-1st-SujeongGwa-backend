const dataSource = require('./dataSource');

const queryCartItems = async (userId) => {
  try {
    const data = await database.query(
      `
        SELECT
          carts.product_id,
          carts.quantity,
          products.sub_category_id,
          products.name,
          products.surface_type_id,
          products.price,
          products.weight
        FROM
          carts
        JOIN
          products ON carts.product_id = products.id
        WHERE
          carts.user_id = ?
        `,
      [userId]
    );
    return data;
  } catch {
    const error = new Error('DATABASE_QUERY_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { queryCartItems, dataSource };
