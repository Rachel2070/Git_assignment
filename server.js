const express = require("express")
const app = express()
const port = 8080
const userRouter = require('./userRouting')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/', userRouter)

app.listen(port, () => {
    console.log("server is runing");
})