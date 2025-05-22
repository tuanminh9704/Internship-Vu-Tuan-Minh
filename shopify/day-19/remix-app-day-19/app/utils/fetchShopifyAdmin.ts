export const fetchShopifyAdmin = async (query: string, accessToken: string) => {
  const response = await fetch(`https://tuanminhstore-com.myshopify.com/admin/api/2025-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({ query })
  });

  const json = await response.json();

  if (json.errors) {
    console.error('Shopify API errors:', json.errors);
  }

  return json.data;
}
