import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { getAllCustomers } from "app/services/customers.service";
import { filterAndProcessParams } from "app/utils/filterAndProcessParams";
import { CustomerTable } from "app/components/CustomerTable";
import { useLoaderData } from "@remix-run/react";
import type { Customer } from "app/types/customer";
import { BUSINESS_FIELDS } from "app/constants/businessFields";
import shopify from "app/shopify.server";
import { shopifyQueue } from "app/queues";
import { bulkQuery } from "app/graphql/mutation";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const rawParams = Object.fromEntries(url.searchParams);
    const params = filterAndProcessParams(rawParams, BUSINESS_FIELDS);
    const customers = await getAllCustomers(params);
    return ({ data: customers });
  } catch (error) {
    console.log("[ERROR]: ", error);
    throw new Error("Internal Server Error");
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { admin } = await shopify.authenticate.admin(request);
    const allCustomerShopify = await admin.graphql(bulkQuery);
    const response = await allCustomerShopify.json();
    await shopifyQueue.add('sync-customers', {admin });
    return null;
  } catch (error) {
    console.log("[ERROR]: ", error);
  }
};


export default function GetCustomers() {
  const loaderData : any = useLoaderData<typeof loader>();
  const customers : Customer[] = loaderData?.data?.customers;
  const pageInfo : any = loaderData?.data?.pageInfo;

  return <CustomerTable customers={customers} pageInfo={pageInfo}/>
}
