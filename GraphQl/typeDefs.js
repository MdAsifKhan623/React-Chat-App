const {gql}= require('apollo-server')
module.exports=gql`
  type User {
      username:String!
      email: String!
  }
  type Query {
    getUsers:[User]!
    users:[ChatUsers!]!
  }

  type ChatUsers{
    name:String!
    email:String!
    password:String!
  }
  type Mutation{
    createUser(name:String!, email:String!, password:String!): ChatUsers!
  }
`;