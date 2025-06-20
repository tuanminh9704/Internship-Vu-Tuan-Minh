import type { ActionFunctionArgs } from "@remix-run/node";
import { redeemPointToCoupon } from "app/services/redeemCode.service";
import { getAccessTokenByShop } from "app/services/session.service";
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const redeemAmount = formData.get("redeem-amount");
  const customerShopifyId = formData.get("customerShopifyId");
  const shop = formData.get("shop")
  const session = await getAccessTokenByShop(shop);
  if (!redeemAmount || isNaN(Number(redeemAmount))) {
    return { success: false, message: "Số điểm không hợp lệ" };
  }
  const newRedeemPoint = await redeemPointToCoupon(
    Number(redeemAmount),
    String(customerShopifyId),
    session?.accessToken,
    shop
  );
  return newRedeemPoint;
};
