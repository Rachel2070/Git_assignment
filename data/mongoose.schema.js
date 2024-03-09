const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id:Number,
    fullName: String,
    email:String,
    tel:String
})

module.exports=mongoose.model('User', userSchema)
