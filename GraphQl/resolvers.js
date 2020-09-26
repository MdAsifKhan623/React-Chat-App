const chatUser=require('../models/chatlist')

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
      users:() => chatUser.find() 
    },
    Mutation:{
        createUser:(_,{name,email,password})=>{
            const user= new chatUser({name,email,password})
            user.save();
            return user;
        }
    }
  };