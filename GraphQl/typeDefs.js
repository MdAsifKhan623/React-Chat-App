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
    login(email:String!, password:String!): usersRegister!
  }

  type ChatUsers{
    name:String!
    email:String!
    password:String!
    image:String!
  }

  type Message{
    uuid:String!
    content:String!
    from:String!
    to:String!
    messageTime:String!
  }

  type usersRegister{
    name:String!
    email:String!
    password:String
    confirmPassword:String!
    token:String
  }
  type Mutation{
    createUser(name:String!, email:String!, password:String!,image:String!): ChatUsers!
    register(name:String!, email:String!, password:String!, confirmPassword:String!):usersRegister! 
    removeUsers(email:String):usersRegister!
    sendMessage(to:String!, content:String!): Message!
  }
`;