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
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getUserEmailById = async function (userId) {
  try {
    const query = 'SELECT email FROM users WHERE id = ?';
    const result = await dataSource.query(query, [userId]);
    const email = result[0]?.email || null;
    return email;
  } catch (err) {
    const error = new Error('Failed to get user email');
    error.statusCode = 500;
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

module.exports = {
  createUser,
  getUserByEmail,
  getUserByAccount,
  getUserEmailById,
};
