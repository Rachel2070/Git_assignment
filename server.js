const express=require("express")
const app=express()
const port=8080

const bodyParser=require('body-parser')
app.use(bodyParser.json())


app.listen(port,()=>{
    console.log("server is runing");
})