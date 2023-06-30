const { createConnection } = require("typeorm");
require("dotenv").config();

const pull_data = async (num) => {
    try {
        const connection = await createConnection({
            type: process.env.DB_CONNECTION,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

        const title_Array = ["Porcelain Tile", "Wall Tile", "Floor Tile"];

        await connection.query(
            `
      INSERT INTO categories (id, title)
      VALUES (${num}, '${title_Array[num - 1]}')
      `
        );

        await connection.close();

        console.log(`Data inserted for index ${num}`);
    } catch (err) {
        console.error(err);
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 400;
        throw error;
    }
};

const main = async () => {
    for (let i = 1; i <= 3; i++) {
        await pull_data(i);
    }
};

main().catch(console.error);
