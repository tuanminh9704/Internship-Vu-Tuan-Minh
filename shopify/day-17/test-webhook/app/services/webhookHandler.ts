export async function handleWebhook(topic: string, payload: any) {
  switch (topic) {
    case "products/delete":
      console.log("Product deleted webhook received:", payload);
      // TODO: Xử lý nghiệp vụ xóa sản phẩm ở đây
      break;
    case "orders/create":
      console.log("Order created webhook received:", payload);
      // TODO: Xử lý nghiệp vụ tạo đơn hàng
      break;
    case "app/uninstalled":
      console.log("App uninstalled webhook received:", payload);
      // TODO: Xử lý khi app bị gỡ khỏi cửa hàng
      break;
    default:
      console.warn(`Unhandled webhook topic: ${topic}`);
  }
}
