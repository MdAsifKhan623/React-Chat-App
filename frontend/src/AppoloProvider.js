import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';
import React from 'react'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export default function ApolloProvider1(props){
    return <ApolloProvider client={client} {...props}/>
}