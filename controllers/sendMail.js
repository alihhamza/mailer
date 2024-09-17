const nodemailer = require("nodemailer");

require('dotenv').config();

const SMTP_HOST = process.env.APP_SMTP_HOST;
const SMTP_PORT = process.env.APP_SMTP_PORT;
const SMTP_USER = process.env.APP_SMTP_USER;
const SMTP_PASS = process.env.APP_SMTP_PASS;
const SMTP_EMAIL_TO = process.env.APP_SMTP_EMAIL_TO;

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
});


const sendMail = async (req, res) => {
    
    const info = await transporter.sendMail({
        from: SMTP_EMAIL_TO, // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "EMAIL Templates", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    if (info.messageId) {
        res.send("Email sent successfully");
    }
}

module.exports = sendMail;