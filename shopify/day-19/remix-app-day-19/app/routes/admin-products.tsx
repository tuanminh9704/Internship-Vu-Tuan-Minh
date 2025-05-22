import { useLoaderData } from "@remix-run/react";
import { PRODUCTS_QUERY } from "app/queries/product";
import { fetchShopifyAdmin } from "app/utils/fetchShopifyAdmin";
import { AdminProduct } from "app/components/AdminProduct";

export const loader = async () => {
  const accessToken : string = process.env.ACCESS_TOKEN || '';
  const data = await fetchShopifyAdmin(
    PRODUCTS_QUERY,
    accessToken,
  );
  const products = data?.products?.edges?.map((edge: any) => edge.node) || [];

  return products;
};

export default function AdminProductPage() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return <AdminProduct products={data} />;

}
