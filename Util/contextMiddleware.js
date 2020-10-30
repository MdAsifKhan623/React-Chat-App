const jwt= require('jsonwebtoken')
const { JWT_TOKEN }= require('../env.json')

module.exports= (context) =>{
    if (context.req && context.req.headers.authorization){
        const token=context.req.headers.authorization.split('Bearer ')[1]
        jwt.verify(token, JWT_TOKEN, (err, decodedToken)=>{
            if (err){
                // throw new AuthenticationError("Unauthenticated Error")
            }
            else{
                 allUsers=decodedToken
                 context.user=decodedToken
            }
        })
    }
    return context
}