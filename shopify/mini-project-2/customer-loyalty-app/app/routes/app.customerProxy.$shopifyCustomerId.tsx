import { getCustomerByShopidyId } from "app/services/customers.service";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({params} : LoaderFunctionArgs) => {
    const {shopifyCustomerId} = params;
    try {
        const customer = await getCustomerByShopidyId(String(shopifyCustomerId));
        return customer;
    } catch (error) {
        console.log('[ERROR]: ', error);
        throw Error('Internal Server Error!');
    }
}