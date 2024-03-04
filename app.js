const express=require("express")
const app=express()
const port=8080
const userRouter=require('./userRouting')
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(allProprtiesFullCheak)
app.use('/',userRouter)

app.listen(port, () => {
    console.log("server is runing");
})

function allProprtiesFullCheak(req, res, next) {
    if (req.method == 'POST') {
        if (req.body.fullName && req.body.email && req.body.tel) {
            next()
        }
        else {
            res.send("you need to fill all the fields").status(400)
        }
    }
    else{
        next()
    }
}