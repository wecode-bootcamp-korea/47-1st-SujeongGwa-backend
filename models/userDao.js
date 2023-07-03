const dataSource = require('./dataSource');

const getUserByEmail = async (email) => {
  try {
    const [result] = await dataSource.query(
      `SELECT 
       id,
       type_id,
       account,
       name,
       email, 
       password 
      FROM
       users 
      WHERE 
       email = ?
      `,
      [email]
    );

    return result;
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    error.statusCode = 400;

    throw error;
  }
};

const getUserByAccount = async (account) => {
  try {
    const result = await dataSource.query(
      `SELECT 
      id,
      type_id,
      account,
      name,
      email, 
      password 
     FROM
      users 
     WHERE 
      account = ?
      `,
      [account]
    );

    return [result];
  } catch (error) {
    console.error('INVALID_INPUT_DATA', error);
    error.statusCode = 400;

    throw error;
  }
};

const myaccount = async (userId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
      users.id AS userId,
      users.email AS personalAccount,
      orders.address AS Address,
      JSON_OBJECT(
        'date', JSON_OBJECT(
          'orderNumber', orders.order_number,
          'totalAmount', orders.total_price
        )
      ) AS details
    FROM
      users
      INNER JOIN orders ON users.id = orders.user_id
      INNER JOIN points ON users.id = points.user_id
    WHERE
      users.id = ?
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

module.exports = {
  getUserByEmail,
  getUserByAccount,
  myaccount,
};