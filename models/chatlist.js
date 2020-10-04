const mongoose= require('mongoose')

const chartUsers= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String,

})

const chatUser=mongoose.model('chatUser', chartUsers)
const registerUser=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPassword:String
})

const regUser=mongoose.model('regUser',registerUser)
module.exports={chatUser,regUser}