require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const {dataSource} = require('./models/dataSource');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/ping', function (req, res)  {
  res.json({ message : 'pong' });
});

const PORT = process.env.PORT 

app.listen(PORT, async () => {
  await dataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((error) => {
      console.error('Error occurred during server startup', error);
    });
  console.log(`Server is listening on ${PORT}`);
});