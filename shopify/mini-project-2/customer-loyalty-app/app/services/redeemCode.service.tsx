import db from "../db.server";
import {
  paginateWithoutSorting,
  paginateWithSorting,
} from "app/utils/pagination";
import { generateCoupon } from "app/utils/generateCoupon";
import { createDiscountCode } from "app/shopify-api/discount";

export const getRedeemCode = async (params: any) => {
  try {
    const { before, after, limit, name, sortBy, order } = params;
    if (!sortBy && !order) {
      const { data, pageInfo } = await paginateWithoutSorting({
        model: db.redeemCode,
        name,
        before,
        after,
        limit,
        include: {
          customer: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              name: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Get all customers successfully!",
        redeemCodes: data,
        pageInfo,
      };
    } else {
      const allRedeemCodes = await db.redeemCode.findMany({
        where: name ? { [name]: { contains: name } } : {},

        include: {
          customer: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
              name: true,
            },
          },
        },
      });
      const { records, pageInfo }: any = await paginateWithSorting(
        allRedeemCodes,
        before,
        sortBy,
        order,
        after,
        limit,
      );
      return {
        success: true,
        message: "Get all customers successfully!",
        redeemCodes: records,
        pageInfo: pageInfo,
      };
    }
  } catch (error) {
    console.log("[Error]: ", error);
    return {
      success: false,
      message: "redeem codes not found",
    };
  }
};

export const redeemPointToCoupon = async (
  redeemAmount: number,
  customerShopifyId: string,
  accessToken: any,
  shop: any
) => {
  try {
    console.log('customerShopifyId1====', customerShopifyId);
    const result = await db.$transaction(async (db) => {
      const customer = await db.customer.findFirst({
        where: {
          customerIdShopify: customerShopifyId,
        },
      });
      if (!customer) {
        throw new Error("Not found customer!");
      }
      const pointConfigSelected = await db.pointConfig.findFirst({
        where: {
          selected: true,
        },
      });

      if (!pointConfigSelected) {
        throw new Error("Not found point config!");
      }

      const pointOfCustomer = await db.point.findFirst({
        where: {
          customerId: customer.id,
        },
      });

      const newPoint = Number(pointOfCustomer?.totalPoints) - redeemAmount;
      if (newPoint < 0) {
        throw new Error("Don't have enoungh points");
      }

      await db.point.update({
        where: {
          id: pointOfCustomer?.id,
        },
        data: {
          totalPoints: Number(newPoint),
        },
      });

      await db.pointLog.create({
        data: {
          customerId: customer.id,
          change: -redeemAmount,
          reason: "RedeemCode",
          type: "spend",
        },
      });

      const cardAmountRecieved =
        Math.round(
          Number(redeemAmount) / Number(pointConfigSelected?.redeemRatePoint),
        ) * Number(pointConfigSelected.redeemRateAmount);
      const code = generateCoupon(10);

      const redeemCodeCreated = await db.redeemCode.create({
        data: {
          code: code,
          amount: cardAmountRecieved,
          customerId: customer.id,
          pointUsed: redeemAmount,
          expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          isUsed: false,
        },
      });
      await createDiscountCode(
        cardAmountRecieved,
        code,
        redeemCodeCreated.expiresAt,
        accessToken,
        shop,
        customerShopifyId
      );

      return {
        code,
        amount: cardAmountRecieved,
        customerId: customer.id,
        pointUsed: redeemAmount,
      };
    });
    return {
      success: true,
      message: "Redeem point is successfully!",
      data: result,
    };
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Redeem Point is failed!",
    };
  }
};

export const getRedeemCodeById = async (customerId: string) => {
  try {
    const customer = await db.customer.findFirst({
      where: {
        customerIdShopify: customerId,
      },
    });
    if (!customer) {
      throw new Error("Not Found Customer!");
    }
    const redeemCodes = await db.redeemCode.findMany({
      where: {
        customerId: Number(customer.id),
        isUsed: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return redeemCodes;
  } catch (error) {
    console.log("[ERROR]: ", error);
  }
};
