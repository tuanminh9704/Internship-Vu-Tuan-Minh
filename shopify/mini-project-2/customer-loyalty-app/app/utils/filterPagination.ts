export const filterPagination = (sortedCustomers : any, after : any, before : any, sortBy: any, limit: any) => {
  let startIndex = 0;

  if (after) {
    const idx = sortedCustomers.findIndex(
      (c: any) => String(c[sortBy]) === String(after),
    );
    startIndex = idx !== -1 ? idx + 1 : 0;
  } else if (before) {
    const idx = sortedCustomers.findIndex(
      (c: any) => String(c[sortBy]) === String(before),
    );
    startIndex = idx !== -1 ? Math.max(0, idx - limit) : 0;
  }
  const page = sortedCustomers.slice(startIndex, startIndex + limit);
  return page;
};
