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

const myaccount = async (userId) => {
  try {
    const data = await dataSource.query(
      `
      SELECT
      users.id AS myId,
      users.name AS myname,
      users.email AS myEmail,
      users.password AS mypassword,
      orders.address AS myAddress
    FROM
      users
      INNER JOIN orders ON users.id = orders.user_id
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
  createUser,
  getUserByEmail,
  getUserByAccount,
  myaccount,
};
