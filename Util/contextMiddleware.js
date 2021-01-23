const jwt= require('jsonwebtoken')
const { JWT_TOKEN }= require('../env.json')
const {PubSub,AuthenticationError} = require('apollo-server')

const pubsub= new PubSub()

module.exports= (context) =>{
    let token
    if (context.req && context.req.headers.authorization){
        token=context.req.headers.authorization.split('Bearer ')[1]
        
    } else if(context.connection && context.connection.context.Authorization){
        
        token=context.connection.context.Authorization.split('Bearer ')[1]
    }
    
    if (token){
        jwt.verify(token, JWT_TOKEN, (err, decodedToken)=>{
            
            if (err){
                throw new AuthenticationError("Unauthenticated Error")
            }
            else{
                allUsers=decodedToken
                context.user=decodedToken
            }
        })
    }
    
    context.pubsub=pubsub
    return context
}