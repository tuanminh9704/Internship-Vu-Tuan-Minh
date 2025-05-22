import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from '@apollo/client/link/http';


export const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://tuanminhstore-com.myshopify.com/admin/api/2025-07/graphql.json", 
      fetch,
        headers: {
            "X-Shopify-Access-Token": process.env.ACCESS_TOKEN as string,
            "Content-Type": "application/json",
        } ,
    }),
    cache: new InMemoryCache(),
  });
};
