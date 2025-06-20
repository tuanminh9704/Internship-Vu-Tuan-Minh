import { type ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";

export async function loader() {
  return {
    message:
      "This is a webhook endpoint, please send a POST request from Shopify",
  };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { payload, session, topic, shop } =
      await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);

    if (session) {
        await db.customer.delete({
            where: {
                 customerIdShopify: payload.id
            }
        })
    }
    return new Response();
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};
