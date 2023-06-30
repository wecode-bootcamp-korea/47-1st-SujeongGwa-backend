const dataSource = require("./dataSource");

const getCarts = async (userId) => {
    try {
        const query = `
        SELECT cartId, productId
        FROM carts
        WHERE userId = ?;
      `;

        return dataSource.query(query, [userId]);
    } catch (error) {
        error = new Error("INVALID_DATA");
        error.statusCode = 400;
        throw error;
    }
};
module.exports = { getCarts };
