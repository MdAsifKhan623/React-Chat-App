const mongoose= require('mongoose')

const chartUsers= new mongoose.Schema({
    name:String,
    email:String,
    password:String

})

const chatUser=mongoose.model('chatUser', chartUsers)
module.exports=chatUser