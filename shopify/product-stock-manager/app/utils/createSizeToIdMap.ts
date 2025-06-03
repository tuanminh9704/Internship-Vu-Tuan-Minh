export const createSizeToIdMap = (variants: any[]): Record<string, string> => {
  const map: Record<string, string> = {};

  for (const variant of variants) {
    const sizeOption = variant.node.selectedOptions.find(
      (opt: any) => opt.name === "Size"
    );

    if (sizeOption) {
      const size = sizeOption.value;
      map[size] = variant.node.id;
    }
  }

  return map;
}