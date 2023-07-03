require('dotenv').config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { getDatabaseConnection } = require("./models/dataSource");
const route = require("./routes");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(route);

app.get('/ping', function (req, res) {
  res.json({ message: 'pong' });
});

const PORT = process.env.PORT;

getDatabaseConnection()
  .then(() => {
    console.log("Database connection has been established!");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error establishing database connection:", err);
  });
