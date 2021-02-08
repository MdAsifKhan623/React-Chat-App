const { ApolloServer } = require('apollo-server-express');
const express=require('express')
const mongoose=require('mongoose')
const contextMiddleware =require('./Util/contextMiddleware')
const resolvers=require('./GraphQl/resolvers/resolverIndex')
const typeDefs= require('./GraphQl/typeDefs')
const {createServer} =require('http')

const startServer = async () => {
  const app=express()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:contextMiddleware
  });

  server.applyMiddleware({ app })

  const httpServer = createServer(app)

  server.installSubscriptionHandlers(httpServer)
  
  await mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true, useUnifiedTopology: true})

  httpServer.listen({port:4000},()=>{
    console.log(`Server started at http://localhost:4000${server.graphqlPath}`)
    console.log(`Server started at  ws://localhost:4000${server.subscriptionsPath}`)
  });

}
startServer()
