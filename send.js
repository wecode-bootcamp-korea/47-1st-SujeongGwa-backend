const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Sujeongwa6@gmail.com',
    pass: 'vjnltmhxziuavjui',
  },
});

const mailOptions = {
  from: 'Sujeongwa6@gmail.com',
  to: 'lena.choe02@gmail.com',
  subject: 'WELCOME TO SJG',
  html: '<p><strong>WELCOME TO SJG TILE!</strong></p><p>ENJOY YOUR NEVER-EXPIRING WELCOME GIFT OF <u>10,000,000 WON</u></p><p>YOU CAN USE IT AT ANY TIME.</p><p>SJW타일에 가입하신 것을 환영합니다!!.</p><p>유효기간이 없는 <u>10,000,000포인트</u>를 지급했습니다.</p><p>언제든 사용하세요!</p>',
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('EMAIL_SENT ' + info.response);
  }
});
