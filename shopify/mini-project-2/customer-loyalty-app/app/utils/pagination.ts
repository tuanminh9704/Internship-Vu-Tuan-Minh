import { sorted } from "./sorted";
import { filterPagination } from "./filterPagination";

export const paginateWithoutSorting = async ({
  model,
  name,
  before,
  after,
  limit = 10,
  include,
}: {
  model: any;
  name?: string;
  before?: any;
  after?: any;
  limit?: number;
  include?: any;
}) => {
  const where: any = {};
  if (before) where.id = { lt: Number(before) };
  else if (after) where.id = { gt: Number(after) };
  if (name) where.name = { contains: name };

  const records = await model.findMany({
    where,
    orderBy: {
      id: before ? "desc" : "asc",
    },
    take: limit,
    include,
  });

  const finalRecords = before ? records.reverse() : records;
  const startCursor = finalRecords[0]?.id;
  const endCursor = finalRecords[finalRecords.length - 1]?.id;
  const hasNextPage = await model.findFirst({
    where: {
      id: { gt: endCursor },
      ...(name ? { name: { contains: name } } : {}),
    },
  });

  const hasPreviousPage = await model.findFirst({
    where: {
      id: { lt: startCursor },
      ...(name ? { name: { contains: name } } : {}),
    },
  });

  return {
    data: finalRecords,
    pageInfo: {
      hasNextPage: !!hasNextPage,
      hasPreviousPage: !!hasPreviousPage,
      startCursor: startCursor?.toString() ?? null,
      endCursor: endCursor?.toString() ?? null,
    },
  };
};

export const paginateWithSorting = async (
  data: any,
  before: string | null,
  sortBy: string,
  order: 'asc' | 'desc',
  after: string | null,
  limit: number,
) => {
  const sortedRecords = sorted(data, sortBy, order);

  const records = filterPagination(sortedRecords, after, before, sortBy, limit);

  const startRecord = records[0];
  const endRecord = records[records.length - 1];

  const startCursor = startRecord ? `${startRecord[sortBy]}::${startRecord.id}` : null;
  const endCursor = endRecord ? `${endRecord[sortBy]}::${endRecord.id}` : null;

  const startIndex = sortedRecords.findIndex(
    (item: any) =>
      item[sortBy] === startRecord?.[sortBy] &&
      item.id === startRecord?.id
  );
  const endIndex = sortedRecords.findIndex(
    (item: any) =>
      item[sortBy] === endRecord?.[sortBy] &&
      item.id === endRecord?.id
  );

  const hasPreviousPage = startIndex > 0;
  const hasNextPage = endIndex < sortedRecords.length - 1;

  return {
    records,
    pageInfo: {
      hasNextPage,
      hasPreviousPage,
      startCursor,
      endCursor,
    },
  };
};

