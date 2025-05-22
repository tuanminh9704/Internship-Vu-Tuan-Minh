export const PRODUCTS_QUERY = `
  query getProducts($query: String) {
    products(first: 10, query: $query) {
      edges {
        node {
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
  }
`;
