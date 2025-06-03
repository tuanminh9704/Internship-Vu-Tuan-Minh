import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import db from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { payload, shop } = await authenticate.webhook(request);
  const productId: string = payload.id;
  if (productId) {
    const id = productId.toString();
    const logExisting = await db.logDeleteProduct.findFirst({
      where: { productId: id },
    });
    if (logExisting) {
      return new Response(null, { status: 403 });
    }
    await db.logDeleteProduct.create({
      data: {
        productId: id,
        shopName: shop,
      },
    });
  }
  return new Response();
};
