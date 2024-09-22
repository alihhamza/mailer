const express = require("express");

const app = express();

const PORT = process.env.APP_PORT || 5000;

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Controllers */
const mailerController = require('./controllers/mailerController');

app.get("/", (req, res) => {
    res.send("I am server");
});

app.get("/send-mail", mailerController.sendMail);
app.post("/communication", mailerController.communicationMail);


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