export async function createDiscountCode(
  amount: number,
  code: string,
  expiresAt: any,
  accessToken: any,
  shop: any,
  customerShopifyId: any,
) {
  try {
    const query = `
    mutation CreateDiscountCode($basicCodeDiscount: DiscountCodeBasicInput!) {
      discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
        codeDiscountNode {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              title
              startsAt
              endsAt
              customerSelection {
                ... on DiscountCustomers {
                  customers {
                    id
                  }
                }
              }
              customerGets {
                value {
                  ... on DiscountPercentage {
                    percentage
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
    const customerId = `gid://shopify/Customer/${customerShopifyId}`;
    // console.log('abc===', customerShopifyId);
    // console.log('customerId====', customerId);
    const variables = {
      basicCodeDiscount: {
        title: `Giảm giá đổi điểm: ${code}`,
        code,
        startsAt: new Date().toISOString(),
        endsAt: expiresAt.toISOString(),
        customerSelection: {
          customers: {
            add: [customerId],
          },
        },
        customerGets: {
          value: {
            discountAmount: {
              amount: amount,
            },
          },
          items: {
            all: true,
          },
        },
        minimumRequirement: {
          subtotal: {
            greaterThanOrEqualToSubtotal: "50.0",
          },
        },
        usageLimit: 1,
        appliesOncePerCustomer: true,
      },
    };

    const response = await fetch(
      `https://${shop}/admin/api/2025-04/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.ACCESSTOKEN!,
        },
        body: JSON.stringify({
          query: query,
          variables,
        }),
      },
    );
    const result = await response.json();
    console.log("result===", result);
    return result;
  } catch (error) {
    console.error("Error creating Shopify discount code:", error);
    throw error;
  }
}
