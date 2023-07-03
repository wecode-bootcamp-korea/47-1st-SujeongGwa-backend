const dataSource = require('./dataSource');

const queryCartItems = async (userId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
  carts.product_id AS productId,
  products.name AS tileName,
  SUM(carts.quantity) AS totalQ,
  products.sub_category_id AS sizeId,
  products.surface_type_id AS surfaceTypeId,
  products.price AS price,
  products.weight AS weight,
  SUM(carts.quantity * products.price) AS totalP,
  CONCAT(FORMAT(SUM(carts.quantity * products.weight), 0), 'kg') AS totalW
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
  products.weight;
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
