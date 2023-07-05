const nodemailer = require('nodemailer');
const userDao = require('../models/usertDao');
const datasource = require('../dataSource');

const sendEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport(datasource.emailService);

    const mailOptions = {
      from: 'Sujeongwa6@gmail.com',
      to: email,
      subject: 'WELCOME TO SJG',
      html: '<p><strong>WELCOME TO SJG TILE!</strong></p><p>ENJOY YOUR NEVER-EXPIRING WELCOME GIFT OF <u>10,000,000 WON</u></p><p>YOU CAN USE IT AT ANY TIME.</p><p>SJW타일에 가입하신 것을 환영합니다!!.</p><p>유효기간이 없는 <u>10,000,000포인트</u>를 지급했습니다.</p><p>언제든 사용하세요!</p>',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('EMAIL_SENT ' + info.response);
  } catch (error) {
    console.log(error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  sendEmail,
};
