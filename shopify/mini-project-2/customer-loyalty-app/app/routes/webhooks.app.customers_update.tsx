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
      const customerExisted = await db.customer.findFirst({
        where: {
          customerIdShopify: String(payload.id),
        }
      })
      if(!customerExisted) {
        throw new Error('Not found customer!');
      }
      const updatedCustomerParams = {
        email: payload.email || "",
        name: payload.addresses.name || "",
        firstName: payload.first_name || "",
        lastName: payload.last_name || "",
      };
      await db.customer.update({
        where: {
          id: customerExisted.id,
        },
        data: {
          ...updatedCustomerParams
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
