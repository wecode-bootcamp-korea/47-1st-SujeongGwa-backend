const { DataSource } = require('typeorm');
const nodemailer = require('nodemailer');

const dataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Sujeongwa6@gmail.com',
    pass: 'vjnltmhxziuavjui',
  },
});

(module.exports = dataSource), { transporter };
