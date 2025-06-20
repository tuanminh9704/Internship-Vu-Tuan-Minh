import { useLoaderData } from "@remix-run/react";
import { getRedeemCode } from "app/services/redeemCode.service";
import type { RedeemCode } from "app/types/redeemCode";
import { RedeemCodeTable } from "app/components/RedeemCodeTable";
import { filterAndProcessParams } from "app/utils/filterAndProcessParams";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { BUSINESS_FIELDS } from "app/constants/businessFields";

export const loader = async ({request} : LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams);
  const params = filterAndProcessParams(rawParams, BUSINESS_FIELDS);

  const jsonData : any = await getRedeemCode(params);
  
  const data: RedeemCode[] = [];
  for (const redeemCode of jsonData?.redeemCodes) {
    const record: RedeemCode = {
      id: redeemCode.id,
      email: redeemCode.customer.email,
      name: redeemCode.customer.name,
      code: redeemCode.code,
      amount: redeemCode.amount,
      pointUsed: redeemCode.pointUsed,
      createdAt: redeemCode.createdAt,
      expiresAt: redeemCode.expiresAt,
      isUsed: redeemCode.isUsed,
    };
    data.push(record);
  }
  return {data: data, pageInfo: jsonData.pageInfo};
};

export default function PointLog() {
  const {data, pageInfo} = useLoaderData<typeof loader>();
  return <RedeemCodeTable redeemCodes={data} pageInfo={pageInfo}/>;
}
