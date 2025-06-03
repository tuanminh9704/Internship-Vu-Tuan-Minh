export const getOptionValuesMapObjRecordKeys = (optionValuesMapObj : any) => {
  const optionValuesMapObjRecord: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(optionValuesMapObj)) {
    if (key !== "Color") {
      optionValuesMapObjRecord[key] = value;
    }
  }
  
  const optionValuesMapObjRecordKeys = Object.keys(optionValuesMapObjRecord);

  return optionValuesMapObjRecordKeys;
};
