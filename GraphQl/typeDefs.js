const {gql}= require('apollo-server')
module.exports=gql`
  type User {
      username:String!
      email: String!
  }
  type Query {
    getUsers:[User]!
    users:[ChatUsers!]!
    registeredUsers:[usersRegister!]!
  }

  type ChatUsers{
    name:String!
    email:String!
    password:String!
    image:String!
  }

  type usersRegister{
    name:String!
    email:String!
    password:String
    confirmPassword:String!
  }
  type Mutation{
    createUser(name:String!, email:String!, password:String!,image:String!): ChatUsers!
    register(name:String!, email:String!, password:String!, confirmPassword:String!):usersRegister! 
    removeUsers(email:String):usersRegister!
  }
`;