import type { ActionFunctionArgs } from "@remix-run/node";
import shopify from "app/shopify.server";
import { bulkQuery } from "app/graphql/mutation";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { admin } = await shopify.authenticate.admin(request);
    const response = await admin.graphql(bulkQuery, {
    });

    const result = response.json();
    console.log('result====', result);
  } catch (error) {
    console.log("[ERROR]: ", error);
  }
};
