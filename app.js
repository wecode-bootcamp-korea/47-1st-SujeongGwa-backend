require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const route = require('./routes');
const DataSource = require('./models/dataSource');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(route);

app.get('/ping', function (req, res) {
  res.json({ message: 'pong' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await DataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });

  console.log(`server listening on port ${PORT}`);
});
