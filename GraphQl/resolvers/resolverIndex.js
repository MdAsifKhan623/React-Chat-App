const userResolvers =require('./userResolver')
const messageResolver=require('./messageResolver')

module.exports={
    Query:{
        ...userResolvers.Query,
        ...messageResolver.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...messageResolver.Mutation
    },
    Subscription:{
        ...messageResolver.Subscription
    }
}