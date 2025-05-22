import { gql } from "@apollo/client/core";

export const GET_PRODUCTS = gql`
  query {
    products(first: 10) {
      nodes {
        id
        title
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
`;
