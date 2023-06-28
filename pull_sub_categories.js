const { createConnection } = require('typeorm');
require('dotenv').config();

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

    const categories_Array = [['600x600x10mm',1],['600x600x20mm',1],['600x1200x11mm',1],['600x1200x20mm',1],['400x800x11mm',1],['300x600x9mm',2],['200x600x9mm',2],['300x300x9mm',3],['200x400x9mm',3]]
    await connection.query(
      `
      INSERT INTO sub_categories (id, size, category_id)
      VALUES (${num}, '${categories_Array[num-1][0]}',${categories_Array[num-1][1]})
      `
    );

    await connection.close();

    console.log(`Data inserted for index ${num}`);
  } catch (err) {
    console.error(err);
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const main = async () => {
  for (let i = 1; i <= 9; i++) {
    await pull_data(i);
  }
};

main().catch(console.error);
