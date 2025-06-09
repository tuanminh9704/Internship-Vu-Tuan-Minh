import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAllCustomers } from "app/services/customers.service";
import { filterAndProcessParams } from "app/utils/filterAndProcessParams";
import { CustomerTable } from "app/components/CustomerTable";
import { useLoaderData } from "@remix-run/react";
import type { Customer } from "app/types/customer";

const BUSINESS_FIELDS = ["limit", "before", "after", "name", "sortBy", "order"];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const rawParams = Object.fromEntries(url.searchParams);
    const params = filterAndProcessParams(rawParams, BUSINESS_FIELDS);
    const customers = await getAllCustomers(params);

    return { data: customers };
  } catch (error) {
    console.log("[ERROR]: ", error);
    throw new Error("Internal Server Error");
  }
};

export default function GetCustomers() {
  const loaderData : any = useLoaderData<typeof loader>();
  console.log('loaderData===', loaderData); 
  const customers : Customer[] = loaderData?.data?.customers;
  const pageInfo : any = loaderData?.data?.pageInfo;
  // console.log('pageInfo==== ',pageInfo);

  return <CustomerTable customers={customers} pageInfo={pageInfo}/>
}
