import React from "react";
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from "@apollo/client";
import {setContext} from 'apollo-link-context';

import App from "../App/App";
import { JWT_KEY } from "../Context/auth";

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext(() => {
  const token = localStorage.getItem(JWT_KEY);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  //@ts-ignore
  link: authLink?.concat(httpLink),
  cache: new InMemoryCache(),
});

const Provider = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default Provider;
