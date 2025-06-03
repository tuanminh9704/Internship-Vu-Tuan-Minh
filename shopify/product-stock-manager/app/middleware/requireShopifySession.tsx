// app/middleware/requireShopifySession.ts
import { redirect } from "@remix-run/node";
import shopify from "app/shopify.server";

export async function requireShopifySession(request: Request) {
  try {
    const { admin, session } = await shopify.authenticate.admin(request);
    if (!session?.shop) {
      throw new Error("Unauthorized");
    }
    return { admin, session };
  } catch {
    throw redirect("/auth/login");
  }
}
