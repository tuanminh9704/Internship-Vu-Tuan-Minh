export const getOptionValuesMapObj = (variants: any) => {
  const optionNames: any = [
    ...new Set(
      variants.flatMap((variant: any) =>
        variant.selectedOptions.map((opt: any) => opt.name),
      ),
    ),
  ];
  const optionValuesMap: Record<string, Set<string>> = {};

  for (const name of optionNames) {
    optionValuesMap[name] = new Set();
  }
  for (const variant of variants) {
    for (const opt of variant.selectedOptions) {
      optionValuesMap[opt.name].add(opt.value);
    }
  }

  const optionValuesMapObj = Object.fromEntries(
    Object.entries(optionValuesMap).map(([key, valueSet]) => [
      key,
      Array.from(valueSet),
    ]),
  );
  return optionValuesMapObj;
};

export const getOptionValuesVariant = (variant: any) => {
  const optionNames: any = [
    ...new Set(variant.selectedOptions.map((opt: any) => opt.name)),
  ];
  const optionValuesMap: Record<string, Set<string>> = {};
    for (const name of optionNames) {
    optionValuesMap[name] = new Set();
  }

  for (const opt of variant.selectedOptions) {
    optionValuesMap[opt.name].add(opt.value);
  }
    const optionValuesMapObj = Object.fromEntries(
    Object.entries(optionValuesMap).map(([key, valueSet]) => [
      key,
      Array.from(valueSet),
    ]),
  );

  return optionValuesMapObj;

};
