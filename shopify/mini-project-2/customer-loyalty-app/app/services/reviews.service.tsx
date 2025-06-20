import db from "../db.server";
import {
  paginateWithoutSorting,
  paginateWithSorting,
} from "app/utils/pagination";

export const getReviews = async (params: any) => {
  try {
    const { before, after, limit, name, sortBy, order } = params;
    if (!sortBy && !order) {
      const { data, pageInfo } = await paginateWithoutSorting({
        model: db.reviews,
        name,
        before,
        after,
        limit,
      });
      
      return {
        success: true,
        message: "Get all customers successfully!",
        reviews: data,
        pageInfo,
      };
    } else {
      const allReviews = await db.reviews.findMany();
      const { records, pageInfo }: any = await paginateWithSorting(
        allReviews,
        before,
        sortBy,
        order,
        after,
        limit,
      );
      return {
        success: true,
        message: "Get all customers successfully!",
        reviews: records,
        pageInfo: pageInfo,
      };
    }
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};

export const updateStatusReview = async (reviewId: number) => {
  try {
    const reviewUpdated = await db.reviews.update({
      where: {
        id: reviewId,
      },
      data: {
        isApproved: true,
      },
    });
    return {
      success: true,
      message: "Review updated successfully!",
      data: reviewUpdated,
    };
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};

export const createReview = async (reviewData: any) => {
  try {
    const customerCreatedReview = await db.customer.findFirst({
      where: {
        customerIdShopify: reviewData?.customerShopifyId,
      },
    });
    // console.log('customerCreatedReview=====', customerCreatedReview);
    const params = {
      email: reviewData?.email,
      content: reviewData?.content,
      rate: Number(reviewData.rating),
      customerId: Number(customerCreatedReview?.id),
      productId: reviewData.productId.toString(),
    };
    const createdReview = await db.reviews.create({
      data: {
        ...params,
        isApproved: false,
      },
    });
    if (reviewData.imagesUrl) {
      for (const imageUrl of reviewData.imagesUrl) {
        await db.reviewThumbnail.create({
          data: {
            reviewId: createdReview?.id,
            url: imageUrl
          }
        })
      }
    }
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export const getReviewsByProductId = async (productId: string) => {
  try {
    const reviews = await db.reviews.findMany({
      where: {
        productId: productId,
        isApproved: true
      },
      include: {
        customer: {
          select: {
            name: true,
          }
        },
        thumbnails: {
          select: {
            url: true
          }
        }
      }
    })
    return {
      success: true,
      message: 'Get all reviews by productId successfully!',
      data: reviews
    }
  } catch (error) {
    console.log('[ERROR]: ', error);
    return {
      success: false,
      message: 'Not Found Reviews!'
    }
  }
}
