const dataSource = require("./dataSource");
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
        error.statusCode = 400;
        throw error;
    }
};
module.exports = { Type };
