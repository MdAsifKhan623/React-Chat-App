const {regUser,userMessage}=require('../../models/chatlist')
const {UserInputError,AuthenticationError,withFilter}=require('apollo-server')
const { v4: uuidv4 }= require('uuid')


module.exports={
    Query:{
        fetchMessage: async(parent, {sender},{user})=>{
            try{
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
    
                return messages
            }catch(err){
                throw err
            }
          },
    },
    Mutation:{
        sendMessage: async(parent, {to,content}, {user, pubsub})=>{
            var recipient1=''
            try{
                if (!user){
                    throw new AuthenticationError('Unauthenticated')
                }
                recipient1=await regUser.findOne({email:to})
                
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
                pubsub.publish('NEW_MESSAGE',{nMessage:newMessage})
                return newMessage

            } catch(err){
                console.log(err)
                throw err
            }
        },
    },
    Subscription:{
        nMessage:{
            subscribe:withFilter((_,__,{pubsub,user})=> {
                if (!user){
                    throw new AuthenticationError('Unauthenticated ggj')
                }
                return pubsub.asyncIterator(['NEW_MESSAGE'])
            },({nMessage}, _, {user})=>{
                if (nMessage.from===user.data.email || nMessage.to===user.data.email){
                    return true
                }
                return false
            })
        }
    }
}