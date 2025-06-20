import db from "../db.server";
import {
  paginateWithoutSorting,
  paginateWithSorting,
} from "app/utils/pagination";

export const getPointConfig = async (params: any) => {
  try {
    const pointConfigs = await db.pointConfig.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return {
      success: true,
      message: "Get point configs successfully!",
      data: pointConfigs,
    };
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Point config not found",
    };
  }
};

export const getPointConfigWithPagination = async (params: any) => {
  try {
    const { before, after, limit, name, sortBy, order } = params;

    if (!sortBy && !order) {
      const { data, pageInfo } = await paginateWithoutSorting({
        model: db.pointConfig,
        name,
        before,
        after,
        limit,
      });

      return {
        success: true,
        message: "Get all customers successfully!",
        pointConfigs: data,
        pageInfo,
      };
    } else {
      const allCustomers = await db.pointConfig.findMany();
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
        pointConfigs: records,
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

export const selectedPointConfig = async (id: any) => {
  try {
    await db.pointConfig.updateMany({
      data: {
        selected: false,
      },
    });
    const updatedPointConfig = await db.pointConfig.update({
      where: {
        id: Number(id),
      },
      data: {
        selected: true,
      },
    });
    return updatedPointConfig;
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};

export const deletedPointConfig = async (id: any) => {
  try {
    const deletedPointConfig = await db.pointConfig.delete({
      where: {
        id: Number(id),
      },
    });
    return {
      success: true,
      message: "Deleted point config successfully!",
      data: deletedPointConfig,
    };
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};

export const updatedPointConfig = async (id: any, jsonBody: any) => {
  try {
    const { earnRate, redeemRatePoint, redeemRateAmount } = jsonBody;
    const updatedPointConfig = await db.pointConfig.update({
      where: {
        id: Number(id),
      },
      data: {
        earnRate: Number(earnRate),
        redeemRatePoint: Number(redeemRatePoint),
        redeemRateAmount: Number(redeemRateAmount),
      },
    });

    return {
      success: true,
      message: "Updated point config successfully!",
      data: updatedPointConfig,
    };
  } catch (error) {
    console.log("[ERROR]: ", error);
    return {
      success: false,
      message: "Internal Server Error!",
    };
  }
};

export const createdPointConfig = async (jsonBody: any) => {
  try {
    const { earnRate, redeemRatePoint, redeemRateAmount } = jsonBody;

    const pointConfigCreated = await db.pointConfig.create({
      data: {
        earnRate: Number(earnRate),
        redeemRatePoint: Number(redeemRatePoint),
        redeemRateAmount: Number(redeemRateAmount),
        selected: false,
      },
    });
    return {
      success: true,
      message: 'Created a new point config',
      data: pointConfigCreated,
    };
  } catch (error) {
    console.log('[ERROR]: ', error);
    return {
      success: false,
      message: 'Created is failed'
    }
  }
};
