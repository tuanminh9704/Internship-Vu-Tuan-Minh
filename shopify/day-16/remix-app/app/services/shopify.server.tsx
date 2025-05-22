import { authenticate } from "app/shopify.server";

export const fetchProduct = async (request: Request, query: string) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(query);
  const json = await response.json();

  return json;
};
