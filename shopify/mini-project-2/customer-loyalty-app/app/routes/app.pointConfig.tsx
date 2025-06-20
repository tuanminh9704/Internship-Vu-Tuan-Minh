import {
  getPointConfigWithPagination,
  selectedPointConfig,
  deletedPointConfig,
  updatedPointConfig,
  createdPointConfig,
} from "app/services/pointConfig.service";
import { PointConfigTable } from "app/components/PointCofigTable";
import { useLoaderData } from "@remix-run/react";
import type { PointConfig } from "app/types/pointConfig";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { filterAndProcessParams } from "app/utils/filterAndProcessParams";
import { BUSINESS_FIELDS } from "app/constants/businessFields";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const rawParams = Object.fromEntries(url.searchParams);
  const params = filterAndProcessParams(rawParams, BUSINESS_FIELDS);
  const pointConfigs = await getPointConfigWithPagination(params);
  return { data: pointConfigs };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const id: any = formData.get("id");
    const actionType = formData.get("actionType");

    if (actionType === "selectPointConfig") {
      const pointConfigUpdated = await selectedPointConfig(id);
      return pointConfigUpdated;
    }
    if (actionType === "deletePointConfig") {
      const pointConfigDeleted = await deletedPointConfig(id);
      return pointConfigDeleted;
    }
    if (actionType === "updatePointConfig") {
      const jsonBody = {
        earnRate: formData.get("earnRate"),
        redeemRatePoint: formData.get("redeemRatePoint"),
        redeemRateAmount: formData.get("redeemRateAmount"),
      };
      const pointConfigUpdated = await updatedPointConfig(id, jsonBody);
      return pointConfigUpdated;
    }

    if(actionType === "createPointConfig") {
      const jsonBody = {
        earnRate: formData.get("earnRate"),
        redeemRatePoint: formData.get("redeemRatePoint"),
        redeemRateAmount: formData.get("redeemRateAmount"),
      };
      const pointCofigCreated = await createdPointConfig(jsonBody);
      return pointCofigCreated;
    }
  } catch (error) {
    console.log("[ERROR]: ", error);
  }
};

export default function PointConfig() {
  const loaderData: any = useLoaderData<typeof loader>();
  const pointConfigs: any = loaderData?.data?.pointConfigs;
  const pageInfo: any = loaderData?.data?.pageInfo;
  return <PointConfigTable pointConfigs={pointConfigs} pageInfo={pageInfo}/>;
}
