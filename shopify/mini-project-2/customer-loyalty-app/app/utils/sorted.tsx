export const sorted = (allData: any[], sortBy: string, order: 'asc' | 'desc'): any[] => {
  if (!allData || allData.length === 0) return allData;

  return [...allData].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return order === "asc"
        ? valueA.getTime() - valueB.getTime()
        : valueB.getTime() - valueA.getTime();
    }

    return order === "asc" ? valueA - valueB : valueB - valueA;
  });
};
