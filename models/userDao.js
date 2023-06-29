const dataSource = require("./dataSource");

const createUser = async function (type_id, name, email, hashedPassword, account) {
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
            [type_id, name, email, hashedPassword, account]
        );
        return result;
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};

const Type = async (name) => {
    try {
        return await dataSource.query(
            `INSERT INTO 
              types(
              name
              ) VALUES (?);`,
            [name]
        );
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};
module.exports = { createUser, Type };
