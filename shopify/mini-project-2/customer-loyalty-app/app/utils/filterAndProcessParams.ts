export const filterAndProcessParams = (rawParams: any, BUSINESS_FIELDS: any) => {
  const filteredParams: Record<string, any> = {};
  const numberFields = ['limit'];

  for (const key of BUSINESS_FIELDS) {
    if (rawParams[key]) {
      if (numberFields.includes(key)) {
        filteredParams[key] = Number(rawParams[key]);
      } else {
        filteredParams[key] = rawParams[key]; 
      }
    }
  }

  if (!filteredParams.limit) {
    filteredParams.limit = 4;
  }

  return filteredParams;
}
