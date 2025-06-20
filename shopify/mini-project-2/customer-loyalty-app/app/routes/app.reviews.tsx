import { useLoaderData } from "@remix-run/react";
import { getReviews, updateStatusReview } from "app/services/reviews.service";
import { ReviewTable } from "app/components/ReviewTable";
import { BUSINESS_FIELDS } from "app/constants/businessFields";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { filterAndProcessParams } from "app/utils/filterAndProcessParams";
import { Frame } from "@shopify/polaris";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const rawParams = Object.fromEntries(url.searchParams);
    const params = filterAndProcessParams(rawParams, BUSINESS_FIELDS);
    const reviews = await getReviews(params);
    return { data: reviews };
  } catch (error) {
    console.log("[ERROR]: ", error);
  }
};

export const action = async ({request} : ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const reviewId = formData.get('reviewId');
    const reviewUpdated = await updateStatusReview(Number(reviewId))
    return reviewUpdated;
  } catch (error) {
    console.log("[ERROR]: ", error);
  }
}

export default function Reviews() {
  const loaderData: any = useLoaderData<typeof loader>();
  const reviews: any = loaderData?.data?.reviews;
  const pageInfo: any = loaderData?.data?.pageInfo;
  return (
    <Frame>
      <ReviewTable reviews={reviews} pageInfo={pageInfo}/>
    </Frame>
  )
}
