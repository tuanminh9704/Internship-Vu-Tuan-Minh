import { type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { uploadFileToCloudinary } from "app/utils/uploadCloudinary";
import { createReview, getReviewsByProductId } from "app/services/reviews.service";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    // console.log('formdata===', formData);
    const email = formData.get("email")?.toString();
    const content = formData.get("content")?.toString();
    const rating = formData.get("rating");
    const files = formData.getAll("images") as File[];
    const customerShopifyId = formData.get("customerId");
    const productId = formData.get("productId");
    const imagesUrl = [];
    if (files) {
      for (const file of files) {
        const url = await uploadFileToCloudinary(file);
        imagesUrl.push(url);
      }
    }
    const reviewData = {
      email: email || "",
      content: content || "",
      rating: rating || 5,
      imagesUrl: imagesUrl || [],
      customerShopifyId: customerShopifyId,
      productId: productId,
    };

    await createReview(reviewData);
    return {
      message: 'created review successfully!',
    };
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId")?.toString();

    if (!productId) {
      return { error: "Missing productId", status: 400 };
    }
    const reviewsByProductId = await getReviewsByProductId(productId);
    return reviewsByProductId;
  } catch (error) {
    console.log("[ERROR]: ", error);
  }
};
