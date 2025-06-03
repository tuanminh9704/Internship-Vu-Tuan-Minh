import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import shopify from "app/shopify.server";
import { GET_PRODUCTS } from "app/graphql/queries";
import type { Product } from "app/types/product";
import { GetProducts } from "app/components/GetProducts";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { admin } = await shopify.authenticate.admin(request);
    const url = new URL(request.url);
    const after = url.searchParams.get("after");
    const before = url.searchParams.get("before");

    const variables: any = {};

    if (after) {
      variables.first = 4;
      variables.after = after;
    } else if (before) {
      variables.last = 4;
      variables.before = before;
    } else {
      variables.first = 4;
    }

    const response = await admin.graphql(GET_PRODUCTS, {
      variables
    });
    const data = await response.json();
    const pageInfo = data?.data?.products.pageInfo;
    const products: Product[] =
      data?.data?.products.edges.map((edge: any) => edge.node) || [];
    return { products, pageInfo };
  } catch (error) {
    console.log("[ERROR]: ", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export default function Products() {
  const { products, pageInfo } = useLoaderData<typeof loader>();

  return <GetProducts products={products} pageInfo={pageInfo} />;
}
