const dataSource = require('./dataSource');

const totalPoints = async (userId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
        user_id,
        order_order_number AS order_number,
        created_at,
        1000 - SUM(order_total_price) OVER (PARTITION BY user_id ORDER BY created_at ASC) AS remaining_price
      FROM 
        points
      WHERE
        user_id = ?
      ORDER BY
        created_at ASC
          `,
      [userId]
    );
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_QUERY_ERROR');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = { totalPoints };
