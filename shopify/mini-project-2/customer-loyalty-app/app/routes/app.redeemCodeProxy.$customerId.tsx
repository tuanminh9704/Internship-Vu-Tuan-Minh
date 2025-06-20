import type { LoaderFunctionArgs } from "@remix-run/node";
import { getRedeemCodeById } from "app/services/redeemCode.service";

export const loader = async ({params} : LoaderFunctionArgs) => {
    try {
        const {customerId} = params;
        const redeemCodes = await getRedeemCodeById(String(customerId))
        return {
            success: true,
            message: 'Get all redeem codes by id successfully!',
            data: redeemCodes
        }
    } catch (error) {
        console.log('[ERROR]: ', error);
        return {
            success: false,
            message: 'Not Found Redeem Code!'
        }
    }
}