import db from "../db.server";
import { sorted } from "app/utils/sorted";
import { filterPagination } from "app/utils/filterPagination";

export const getAllCustomers = async (params: any) => {
  try {
    const { before, after, limit, name, sortBy, order } = params;

    const allCustomers = await db.customer.findMany({
      include: {
        points: {
          select: {
            totalPoints: true,
          },
        },
      },
    });

    let startCursor: number | undefined;
    let endCursor: number | undefined;

    if (!sortBy && !order) {
      const customers = await db.customer.findMany({
        where: {
          id: before
            ? { lt: Number(before) }
            : Number(after)
              ? { gt: Number(after) }
              : undefined,
          name: {
            contains: name || undefined,
          },
        },
        orderBy: {
          id: before ? "desc" : "asc",
        },
        include: {
          points: {
            select: {
              totalPoints: true,
            },
          },
        },
        take: limit,
      });

      const finalCustomers = before ? customers.reverse() : customers;

      if (finalCustomers.length === 0) {
        return {
          customers: [],
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: null,
            endCursor: null,
          },
        };
      }
      startCursor = finalCustomers[0].id;
      endCursor = finalCustomers[finalCustomers.length - 1].id;

      const hasNextPage = await db.customer.findFirst({
        where: {
          id: {
            gt: endCursor,
          },
          name: {
            contains: name || undefined,
          },
        },
      });

      const hasPreviousPage = await db.customer.findFirst({
        where: {
          id: {
            lt: startCursor,
          },
          name: {
            contains: name || undefined,
          },
        },
      });

      return {
        success: true,
        message: "Get all customers successfully!",
        customers: finalCustomers,
        pageInfo: {
          hasNextPage: hasNextPage ? true : false,
          hasPreviousPage: hasPreviousPage ? true : false,
          startCursor: startCursor.toString(),
          endCursor: endCursor.toString(),
        },
      };
    } else {
      const sortedCustomers = sorted(allCustomers, sortBy, order);

      const customers = filterPagination(
        sortedCustomers,
        after,
        before,
        sortBy,
        limit,
      );
      const startCursor = customers[0]?.[sortBy] ?? null;
      const endCursor = customers[customers.length - 1]?.[sortBy] ?? null;

      let maxSortBy;
      let minSortBy;
      if (order === "desc") {
        maxSortBy = sortedCustomers[0][sortBy];
        minSortBy = sortedCustomers[sortedCustomers.length - 1][sortBy];
      } else {
        minSortBy = sortedCustomers[0][sortBy];
        maxSortBy = sortedCustomers[sortedCustomers.length - 1][sortBy];
      }

      const hasNextPage = endCursor !== maxSortBy;
      const hasPreviousPage = startCursor !== minSortBy;
      return {
        success: true,
        message: "Get all customers successfully!",
        customers: customers,
        pageInfo: {
          hasNextPage,
          hasPreviousPage,
          startCursor: startCursor,
          endCursor: endCursor,
        },
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
