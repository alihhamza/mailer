const nodemailer = require("nodemailer");

require('dotenv').config();

const fs = require('fs');
const path = require('path');

const template1 = "../views/emails/template1.html"
const template2 = "../views/emails/template2.html"
const template3 = "../views/emails/template3.html"
const template4 = "../views/emails/template4.html"

const SMTP_HOST = process.env.APP_SMTP_HOST;
const SMTP_PORT = process.env.APP_SMTP_PORT;
const SMTP_USER = process.env.APP_SMTP_USER;
const SMTP_PASS = process.env.APP_SMTP_PASS;
const SMTP_EMAIL_FROM = process.env.APP_SMTP_EMAIL_FROM;

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

    try {
        const temp = req.query.template;
        const templatePath = path.join(__dirname, `../views/emails/${temp}.html`);
        let htmlContent = fs.readFileSync(templatePath, 'utf-8');

        
        const info = await transporter.sendMail({
            from: SMTP_EMAIL_FROM, // sender address
            to: "alihamza1@outlook.com", // list of receivers
            subject: "Promotion Emails", // Subject line
            html: htmlContent, // html body
        });
    
        if (info.messageId) {
            res.send("Email sent successfully");
        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong!!!" });
    }
}

const communicationMail = async (req, res) => {

    try {
        const { name, email, phone, message } = req.body;

        const info = await transporter.sendMail({
            from: 'support@soltanianco.com', // sender address
            to: SMTP_EMAIL_FROM, // list of receivers
            subject: "Communication Support", // Subject line
            text: `Name: ${name} \nEmail: ${email} \nPhone: ${phone} \nMessage: ${message}`, // plain text body
        });

        if (info.messageId) {
            res.json({
                message: "Email sent successfully",
                status: true,
            });
        } else {
            res.status(400).json({ message: "Email not sent" });
        }
    } catch (error) {
        res.status(400).json({ message: "Something went wrong!!!" });
    }
}

module.exports = {
    sendMail,
    communicationMail
};