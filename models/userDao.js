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
              account,
              point
              ) VALUES (?, ?, ?, ?, ?,1000000);
          `,
      [typeId, name, email, hashedPassword, account]
    );
    return result;
  } catch (error) {
    const err = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw err;
  }
};
const sendEmail = function (userId) {
  try {
    const [result] = dataSource.query(
      `SELECT 
 email 
 FROM 
 users.id=?:
`,
      [userId]
    );
    return result;
  } catch (err) {
    const error = new Error('EMAIL SEND ERROR');
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
      o.order_number AS orderNumber,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'name', p.name,
              'price', p.price,
              'sizeId', p.sub_category_id,
              'imageUrl', p.image_url,
              'productId', p.id,
              'surfaceTypeId', p.surface_type_id
          )
      ) AS orderList
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

const myAccount = async (userId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
      users.id AS myId,
      users.name AS myName,
      users.email AS myEmail,
      point
    FROM
      users
    WHERE
      users.id = ?
      `,
      [userId]
    );
    return data;
  } catch (err) {
    console.log(err);
    const error = new Error('DATABASE_QUERY_ERROR');
    error.statusCode = 400;
    throw error;
  }
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserByAccount,
  sendEmail,
  orderlist,
  myAccount,
};
