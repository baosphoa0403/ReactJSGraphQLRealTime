import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WebSocketLink } from '@apollo/client/link/ws';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// const link = createHttpLink({
//   uri: 'http://localhost:4000/graphql',
//   credentials: 'include',
//   onError: ({ networkError, graphQLErrors }) => {
//     console.log('graphQLErrors', graphQLErrors);
//     console.log('networkError', networkError);
//   },
// });
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
  credentials: 'include',
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  link: splitLink,
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
