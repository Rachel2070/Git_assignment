const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouter = require('./routers/userRouting')
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(validateAllProprtiesFull)
app.use(validateEmail)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to DB succsessfully"))
    .catch(err => console.log("connection failed " + err))

app.use('/users', userRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB database");
    app.listen(PORT, () => {
        console.log("App is running!!");
    });
})


function validateAllProprtiesFull(req, res, next) {
    if (req.method == 'POST') {
        if (req.body.fullName && req.body.email && req.body.tel) {
            next()
        }
        else {
            res.send("you need to fill all the fields").status(400)
        }
    }
    else {
        next()
    }
}

function validateEmail(req, res, next) {
    const email = req.body.email;

    if ((!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && req.method == 'POST') {
        res.send("your email address is missing or invalid").status(400)
    }
    else {
        next()
    }
}
