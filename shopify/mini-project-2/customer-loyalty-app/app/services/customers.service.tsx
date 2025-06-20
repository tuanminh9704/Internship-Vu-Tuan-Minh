import db from "../db.server";
import {
  paginateWithoutSorting,
  paginateWithSorting,
} from "app/utils/pagination";

export const getAllCustomers = async (params: any) => {
  try {
    const { before, after, limit, name, sortBy, order } = params;

    if (!sortBy && !order) {
      const { data, pageInfo } = await paginateWithoutSorting({
        model: db.customer,
        name,
        before,
        after,
        limit,
        include: {
          points: {
            select: { totalPoints: true },
          },
        },
      });

      return {
        success: true,
        message: "Get all customers successfully!",
        customers: data,
        pageInfo,
      };
    } else {
      const allCustomers = await db.customer.findMany({
        where: name ? { name: { contains: name } } : {},

        include: {
          points: {
            select: {
              totalPoints: true,
            },
          },
        },
      });
      const { records, pageInfo }: any = await paginateWithSorting(
        allCustomers,
        before,
        sortBy,
        order,
        after,
        limit,
      );
      return {
        success: true,
        message: "Get all customers successfully!",
        customers: records,
        pageInfo: pageInfo,
      };
    }
  } catch (error) {
    console.log("[Error]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};

export const getCustomerById = async (id: number) => {
  try {
    const customer = await db.customer.findFirst({
      where: {
        id: id,
      },
      include: {
        points: {
          select: {
            totalPoints: true,
          },
        },
        pointLogs: {
          select: {
            change: true,
            reason: true,
            type: true,
            createdAt: true,
          },
        },
      },
    });
    return {
      success: true,
      message: "Get customer successfully!",
      data: {
        customer: customer,
      },
    };
  } catch (error) {
    console.log("[Error]: ", error);
    throw new Error("Internal Server Error!");
  }
};

export const getCustomerByShopidyId = async (shopifyCustomerId: string) => {
  try {
    const customer = await db.customer.findFirst({
      where: {
        customerIdShopify: shopifyCustomerId
      },
      include: {
        points: {
          select: {
            totalPoints: true,
          },
        },
        pointLogs: {
          select: {
            change: true,
            reason: true,
            type: true,
            createdAt: true,
          },
        },
      },
    });
    return {
      success: true,
      message: "Get customer successfully!",
      data: {
        customer: customer,
      },
    };
  } catch (error) {
    console.log("[Error]: ", error);
    throw new Error("Internal Server Error!");
  }
};
