const { createConnection } = require("typeorm");

let connection = null;

const getDatabaseConnection = async () => {
  if (!connection) {
    connection = await createConnection({
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
    });
  }

  const queryRunner = connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  return {
    connection,
    queryRunner,
  };
};

module.exports = {
  getDatabaseConnection,
  getConnection: getDatabaseConnection,
};
