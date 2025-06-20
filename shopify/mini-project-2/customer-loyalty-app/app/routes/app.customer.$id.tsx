import type { LoaderFunctionArgs } from "@remix-run/node";
import { getCustomerById } from "app/services/customers.service";
import { useLoaderData } from "@remix-run/react";
import type { CustomerDetail } from "app/types/customer";
import { CustomerDetailComponent } from "app/components/CustomerDetailComponent";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { id } = params;
  try {
    const customer = await getCustomerById(Number(id));
    return customer;
  } catch (error) {
    console.log("[ERROR]: ", error);
    throw Error("Internal Server Error!");
  }
};

export default function CustomerDetail() {
  const loaderData: any = useLoaderData<typeof loader>();
  const customer: CustomerDetail = loaderData?.data?.customer;

  return <CustomerDetailComponent customer={customer} />;
}
