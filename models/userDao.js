const dataSource = require('./dataSource');
const queryRunner = require('./dataSource');

const createUser = async function (
  typeId,
  name,
  email,
  hashedPassword,
  account
) {
  let result;

  try {
    await queryRunner.startTransaction();

    result = await queryRunner.query(
      `INSERT INTO 
          users(
          type_id,
          name,
          email,
          password,
          account,
          point
          ) VALUES (?, ?, ?, ?, ?, 1000000);
      `,
      [typeId, name, email, hashedPassword, account]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }

  return result;
};

const createUserAndSendEmail = async (newUser) => {
  let user;

  try {
    await queryRunner.startTransaction();

    user = await createUserE(newUser);
    await sendEmail(user.email);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  }

  return user;
};

const createUserE = async (newUser) => {
  const { email } = newUser;
  const result = await queryRunner.query(
    `INSERT INTO users (email) VALUES (?)`,
    [email]
  );
  return result;
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
  createUserAndSendEmail,
};
