import crypto from "crypto";

export function verifyShopifyWebhook(rawBody: string, hmacHeader: string) {
  const secret = process.env.SHOPIFY_API_SECRET || "";
  const hash = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  // So sánh HMAC header và hash tính được
  return hash === hmacHeader;
}
