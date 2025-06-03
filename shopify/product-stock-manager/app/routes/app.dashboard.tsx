import type { LoaderFunctionArgs } from "@remix-run/node";
import { DashBoardPage } from "app/components/DashBoard";
import shopify from "app/shopify.server";
import { PRODUCT_STATISTIC } from "app/graphql/queries";
import { useLoaderData } from "@remix-run/react";
import  type { ProductStatistics } from "app/types/product";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { admin } = await shopify.authenticate.admin(request);
    const response = await admin.graphql(PRODUCT_STATISTIC);
    const jsonData = await response.json();
    const productData = jsonData.data;
    // console.log('total===', productData.products);
    const productsEdges = productData?.products?.edges;
    const inventoryTotal = productsEdges.reduce(
      (total: number, item: any) => (total += item.node.totalInventory),
      0,
    );
    let totalDiscountProduct = 0;
    for (const edge of productsEdges) {
      const variants = edge?.node?.variants?.edges || [];
      const hasDiscount = variants.some((item: any) => item.node.compareAtPrice !== null);
      if (hasDiscount) {
        totalDiscountProduct++;
      }
    }

    const productStatistics = {
      countProduct: productData?.productsCount,
      inventoryTotal: inventoryTotal,
      totalDiscountProduct: totalDiscountProduct
    };
    return productStatistics;
  } catch (error) {
    console.log("[ERROR]: ", error);
    throw new Error("Internal Server Error!");
  }
};

export default function Dashboard() {
  const productStatistics : ProductStatistics = useLoaderData();
  return <DashBoardPage productStatistics={productStatistics}/>;
}
