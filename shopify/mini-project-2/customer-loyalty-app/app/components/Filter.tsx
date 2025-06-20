import { Select, InlineStack } from "@shopify/polaris";

type FilterProp = {
    option: any,
    handleSelectFilter: any,
    selectedFilter: any,
    sortOption: any,
    handleSelectSort: any,
    selectedSort: any
}

export const Filter = ({
  option,
  handleSelectFilter,
  selectedFilter,
  sortOption,
  handleSelectSort,
  selectedSort,
} : FilterProp) => {
  return (
    <InlineStack gap="500">
      <div style={{ maxWidth: "150px" }}>
        <Select
          label="Filter"
          options={option}
          onChange={handleSelectFilter}
          value={selectedFilter}
        />
      </div>
      <div style={{ maxWidth: "150px" }}>
        <Select
          label="Order"
          options={sortOption}
          onChange={handleSelectSort}
          value={selectedSort}
        />
      </div>
    </InlineStack>
  );
};
