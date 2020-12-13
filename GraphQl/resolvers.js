const {chatUser,regUser,userMessage}=require('../models/chatlist')
const { UserInputError,AuthenticationError }=require('apollo-server')
const jwt=require('jsonwebtoken')
const { JWT_TOKEN }= require('../env.json')
const { v4: uuidv4 }= require('uuid')

module.exports={
    Query: {
      
      users:() => chatUser.find(), 
      fetchMessage: async(parent, {sender},{user})=>{
        try{
            console.log(user)
            if (!user){
                throw new AuthenticationError('Unauthenticated User')
            }
            const secondUser=await regUser.findOne({email:sender})
            if (!secondUser){
                throw new UserInputError('User not Found')
            }
            const messages=await userMessage.find({
              $or:
              [
               {$and:[{from:sender},{to:user.data.email}]},
               {$and:[{from:user.data.email},{to:sender}]}
              ]
            }).sort({messageTime:-1})

            console.log(messages,'done')
        }catch(err){
            console.log(err)
            throw err
        }
      },
      registeredUsers: (_,__, { user } ) =>{
           console.log(user)
           try{
            if (!user){
                throw new AuthenticationError('Unauthenticated')
            }
            
            let users=regUser.find({email:{$ne:user.data.email}})
            return users
           }catch(e){
               console.log(e)
               return e
           }
           
        },
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
                    throw new UserInputError('Password Incorrect ', {error})
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
        
        //Register Mutation

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
        },

        //Message Mutation
        sendMessage: async(parent, {to,content}, {user})=>{
            var recipient1=''
            try{
                if (!user){
                    throw new AuthenticationError('Unauthenticated')
                }
                recipient1=await regUser.findOne({email:to})
                console.log("Hello-->",recipient1)
                
                if (recipient1===null){
                    throw new UserInputError('User Not Found')
                }
                else if (recipient1.email === user.data.email){
                    throw new UserInputError('You cant message yourself!')
                }
                if (content.trim()===''){
                    throw UserInputError('Please enter some messages to be sent!')
                }
                const newMessage= userMessage({
                    uuid:uuidv4(),
                    from: user.data.email,
                    to,
                    content,
                    messageTime: new Date().toISOString()
                })
                newMessage.save()
                return newMessage

            } catch(err){
                console.log(err)
                throw err
            }
        }
    }
  };