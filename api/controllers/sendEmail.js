const nodemailer = require("nodemailer");

const sendEmail = ({ toEmail, subjectEmail, textEmail }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mainConfig = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: subjectEmail,
    text: textEmail,
  };
  transporter.sendMail(mainConfig, (err, info) => {
    if (err) {
      return err;
    } else {
      return "Mail Sended";
    }
  });
};
module.exports = sendEmail;
