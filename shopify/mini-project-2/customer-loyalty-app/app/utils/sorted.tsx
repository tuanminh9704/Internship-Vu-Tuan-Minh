export const sorted = (customers: any, sortBy: any, order: any) => {
  if (!customers || customers.length === 0) {
    return customers;
  }

  customers.sort((a: any, b: any) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    if (typeof valueA === "string" && typeof valueB === "string") {
      if (order === "asc") {
        return valueA > valueB ? 1 : -1; // Tang dan a > b => a dung sau
      } else {
        return valueA < valueB ? 1 : -1; // Giam dan: a < b => a dung sau
      }
    } else {
      if (order === "asc") {
        return valueA - valueB; // Tăng dần: số nhỏ đứng trước
      } else {
        return valueB - valueA; // Giảm dần: số lớn đứng trước
      }
    }
  });
  return customers;
};
