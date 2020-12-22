import { ApolloClient,createHttpLink, InMemoryCache,ApolloProvider } from '@apollo/client';
import React from 'react'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // uri: 'http://localhost:4000/graphql',
  // cache: new InMemoryCache()
});

export default function ApolloProvider1(props){
    return <ApolloProvider client={client} {...props}/>
}