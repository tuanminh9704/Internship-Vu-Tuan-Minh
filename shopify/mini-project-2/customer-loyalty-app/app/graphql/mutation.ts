export const discountCodeBasicCreate = `
      discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
        codeDiscountNode {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              title
              codes(first: 1) {
                edges {
                  node {
                    code
                  }
                }
              }
              startsAt
              endsAt
              customerGets {
                value {
                  ... on DiscountAmount {
                    amount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
`;

export const bulkQuery = `
    mutation {
      bulkOperationRunQuery(
        query: """
        {
          customers {
            edges {
              node {
                id
                email
                firstName
                lastName
                phone
                createdAt
                updatedAt
              }
            }
          }
        }
        """
      ) {
        bulkOperation {
          id
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

export const currentBulkOperation = `
query {
  currentBulkOperation {
    id
    status
    url
    errorCode
    objectCount
    createdAt
    completedAt
  }
}`
