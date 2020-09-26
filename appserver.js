const { ApolloServer } = require('apollo-server-express');
const express=require('express')
const mongoose=require('mongoose')

const resolvers = require('./GraphQl/resolvers')
const typeDefs= require('./GraphQl/typeDefs')


const startServer = async () => {
  const app=express()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app })
  
  await mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true, useUnifiedTopology: true})

  // server.listen().then(({ url }) => {
  //   console.log(`🚀 Server ready at ${url}`);
  // });

  app.listen({port:4000},()=>{
    console.log(`Server started at http://localhost:4000${server.graphqlPath}`)
  });

}
startServer()
