const mongoose= require('mongoose')

const chartUsers= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String,

})

const messages= new mongoose.Schema({
    content:String,
    uuid:String,
    from:String,
    to:String,
    messageTime:String
})

const chatUser=mongoose.model('chatUser', chartUsers)
const registerUser=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPassword:String,
})

const userMessage= mongoose.model ('userMessage', messages)

const regUser=mongoose.model('regUser',registerUser)
module.exports={chatUser,regUser, userMessage}