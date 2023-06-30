const dataSource = require("./dataSource");

const getProductDetails = async function (productId) {
    try {
        const detail = await dataSource.query(
            `
            SELECT
                sub_category_id,
                name,
                surface_type_id,
                price,
                weight
            FROM
                products
            WHERE
                products.id = ?
            `,
            [productId]
        );

        return detail;
    } catch (error) {
        console.log(error);
        throw new Error("DATABASE_CONNECTION_ERROR");
    }
};

module.exports = { getProductDetails };
