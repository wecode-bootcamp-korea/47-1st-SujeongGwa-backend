const dataSource = require("./dataSource");

const getUserByEmail = async (email) => {
  try {
    const result = await dataSource.query(
      `SELECT 
      email, password 
      FROM users 
      WHERE email = ?
      `,
      [email]
    );
  
    return result;
  } catch (error) {
    console.error("Error", error);
    error.statusCode = 400;

    throw error;
  }
};

const getUserByAccount = async (account) => {
  try {
    const result = await dataSource.query(
      `SELECT 
      account, password 
      FROM users 
      WHERE account = ?
      `,
      [account]
    );

    return result;
  } catch (error) {
    console.error("Error", error);
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  getUserByEmail,
  getUserByAccount,
};
