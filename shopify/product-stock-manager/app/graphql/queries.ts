export const GET_PRODUCTS = `
  query getProducts(
    $first: Int,
    $last: Int,
    $after: String,
    $before: String
  ) {
    products(first: $first, last: $last, after: $after, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          id
          title
          totalInventory
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

export const GET_PRODUCT = `
  query getProduct($id: ID!, $first: Int!) {
    product(id: $id) {
      id
      title
      description
      images(first: $first) {
        edges {
          node {
            url
          }
        }
      }
      variants(first: $first) {
        edges {
          node {
            id
            title
            price
            inventoryQuantity
            selectedOptions {
              name
              value
            }
            inventoryItem {
              id
              sku
              tracked
              inventoryLevels(first: 10) {
                edges {
                  node {
                    id
                    quantities(names: ["available"]) {
  									  name
  									  quantity
									  }
                    location {
                      id
                      name
                    }
                  }
                }
              }
            } 
          }
        }
      }
    }
  }
`;

export const PRODUCT_STATISTIC = `
    query {
      productsCount {
        count
      }
      products(first: 100) {
        edges {
          node {
            totalInventory
            variants(first: 100) {
              edges {
                node {
                  id
                  price
                  compareAtPrice
                  title
                  inventoryQuantity
                }
              }
            }
          }
        }
      }
    }
`
