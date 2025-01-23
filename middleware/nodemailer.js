const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
//   secure: false, // use SSL
  auth: {
    user: 'prafuldukhi@gmail.com',
    pass: 'pnvipephsucbgxgp',
  }
});

module.exports.sendOtp = (toEmail, otp) => {
    console.log(toEmail)
  const mailOptions = {
    from: 'prafuldukhi@gmail.com',
    to: toEmail,
    subject: 'Your OTP for Registration',
    text: `Your OTP for registration is: ${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
        reject(false);
      } else {
        console.log('OTP sent: ' + info.response);
        resolve(true);
      }
    });
  });
};
