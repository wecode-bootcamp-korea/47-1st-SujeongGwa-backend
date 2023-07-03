const dataSource = require('./dataSource');

const createUser = async function (
  typeId,
  name,
  email,
  hashedPassword,
  account
) {
  try {
    const result = await dataSource.query(
      `INSERT INTO 
              users(
              type_id,
              name,
              email,
              password,
              account
              ) VALUES (?, ?, ?, ?, ?);
          `,
      [typeId, name, email, hashedPassword, account]
    );
    return result;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

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

const orderlist = async function (userId) {
  try {
    const myOrderlist = await dataSource.query(
      `
      SELECT
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'name', p.name,
          'price', p.price,
          'sizeId', p.sub_category_id,
          'mainName', CONCAT(
            CASE
              WHEN p.sub_category_id IN (1, 2, 3, 4, 5) THEN CONCAT('P_', p.sub_category_id)
              WHEN p.sub_category_id IN (6, 7) THEN CONCAT('W_', p.sub_category_id - 5)
              WHEN p.sub_category_id IN (8, 9) THEN CONCAT('F_', p.sub_category_id - 7)
              ELSE ''
            END,
            '_',
            p.name,
            '_',
            p.surface_type_id
          ),
          'image_url', p.image_url,
          'product_id', p.id,
          'surface_type_id', p.surface_type_id
        )
      ) AS data,
      o.order_number
    FROM
      orders o
      JOIN order_detail od ON o.id = od.order_id
      JOIN products p ON od.product_id = p.id
    WHERE
      o.user_id = ?
    GROUP BY
      o.order_number;
      `,
      [userId]
    );

    return myOrderlist;
  } catch (error) {
    const err = new Error('DATABASE_QUERY_ERROR');
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByAccount,
  orderlist,
};
