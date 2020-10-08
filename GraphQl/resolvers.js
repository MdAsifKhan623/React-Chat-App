const {chatUser,regUser}=require('../models/chatlist')
const { UserInputError,AuthenticationError }=require('apollo-server')
const jwt=require('jsonwebtoken')
const { JWT_TOKEN }= require('../env.json')

module.exports={
    Query: {
      getUsers:()=>{
          const users=[
              {
                  username:"Asif",
                  email:"mkhan135@fiu.edu"
              },
              {
                  username: "Khan125",
                  email:"mdasifk22@gmail.com"
              },
          ]
          return users
      },
      users:() => chatUser.find(), 
      registeredUsers:() => regUser.find(),
      login: async (_, args)=>{
        let error={}
        const {email,password}= args
        console.log(args)
        try{
            if (email.trim()==='') error.email="user does not exist"
            if (password==='') error.password="Password can't be empty"
            if (Object.keys(error).length>0){
                throw new UserInputError('User input error',{error})
            }
            let res= await regUser.findOne({email:email}).exec()
            if (res){
                if (res.password!=password){
                    error.password="Incorrect Password"
                    throw new AuthenticationError('Password Incorrect ', {error})
                }
                else{
                    const token=jwt.sign({
                        data: { email }
                      }, JWT_TOKEN, { expiresIn: 60 * 60 });
                    return {
                        ...res.toJSON(),
                        token
                    }
                }
            }
            else{
                error.email="user does not exist"
                throw new UserInputError('User input error',{error})
            }
        }catch(e){
            console.log(e)
            throw e
        }
      }
    },
    Mutation:{
        createUser:(_,{name,email,password,image})=>{
            const user= new chatUser({name,email,password,image})
            user.save();
            return user;
        },

        removeUsers:(_,{email})=>{
            let emailId=email
            regUser.deleteMany({email:emailId},(err)=>{
                if (err){
                    console.log(err)
                }
            })

            return regUser.find()
        },
        register: async (_,{name,email,password,confirmPassword})=>{
            let error={}
            let uname=name
            let emailId=email
            try{
                //Validate the i/p data
                if (uname.trim()==='') error.name="Name field must not be empty"
                if (emailId.trim()==='') error.email="email field must not be empty"
                if (password.trim()==='') error.password="password field must not be empty"
                if (confirmPassword.trim()==='') error.confirmPassword='Confirm password field must not empty'
                //check if the email exists
                let result= await regUser.findOne({email:emailId}).exec()
                if (result){
                    error.email="User already exists"
                }
                console.log(error.email)
                if(password !== confirmPassword){
                    error.confirmPassword='Password does not match'
                }
                if (Object.keys(error).length>0){
                    throw error
                }
                //create user
                newUser = new regUser({name,email,password,confirmPassword})
                newUser.save()
                //return user
                
                return newUser
                
            }catch(err){
                console.log(err)
                throw new UserInputError('Bad Input', {error:err})
            }
        }
    }
  };