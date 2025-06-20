export const filterPagination = (
  sortedData: any[],
  after: string | null,
  before: string | null,
  sortBy: string,
  limit: number
): any[] => {
  let startIndex = 0;

  if (after) {
    const [afterSort, afterId] = after.split("::");

    const idx = sortedData.findIndex(
      (item) =>
        String(item[sortBy]) === afterSort &&
        String(item.id) === afterId
    );
    startIndex = idx !== -1 ? idx + 1 : 0;
  } else if (before) {
    const [beforeSort, beforeId] = before.split("::");

    const idx = sortedData.findIndex(
      (item) =>
        String(item[sortBy]) === beforeSort &&
        String(item.id) === beforeId
    );
    startIndex = idx !== -1 ? Math.max(0, idx - limit) : 0;
  }

  return sortedData.slice(startIndex, startIndex + limit);
};
