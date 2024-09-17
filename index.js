const express = require("express");

const app = express();

const PORT = process.env.APP_PORT || 5000;

/* Controllers */
const sendMail = require('./controllers/sendMail');

app.get("/", (req, res) => {
    res.send("I am server");
});

app.get("/send-mail", sendMail);


const server = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`App is listening port at ${PORT}`);
            
        });
    } catch (error) {
        console.log(error);
    }
}

server();