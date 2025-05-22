import {
  ResourceList,
  ResourceItem,
  Text,
  Card,
  Page,
  Thumbnail,
  TextField,
  Button,
  Filters,
  Pagination,
} from "@shopify/polaris";

import { useState, useCallback } from "react";

import type { Product } from "app/types/product";

interface adminProductProp {
  products: Product[];
}

export const AdminProduct = ({ products }: adminProductProp) => {
  const [taggedWith, setTaggedWith] = useState<string>("");
  const [queryValue, setQueryValue] = useState<string>("");

  const handleTaggedWithChange = useCallback(
    (value: string) => setTaggedWith(value),
    [],
  );

  const handleQueryValueChange = useCallback(
    (value: string) => setQueryValue(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);

  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const filters = [
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "vendor",
      label: "Vendor",
      filter: <TextField label="Vendor" autoComplete="off" labelHidden />,
      shortcut: true,
      disabled: true,
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(queryValue.toLowerCase()),
  );
  return (
    <Page
      title="Danh sách sản phẩm"
      primaryAction={{ content: "Thêm sản phẩm" }}
    >
      <Card>
        <ResourceList
          resourceName={{ singular: "product", plural: "products" }}
          filterControl={
            <Filters
              queryPlaceholder="Searching title"
              queryValue={queryValue}
              filters={filters}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleClearAll}
              onQueryChange={handleQueryValueChange}
            >
              <div style={{ paddingLeft: "8px" }}>
                <Button
                  disabled
                  variant="tertiary"
                  onClick={() => console.log("New filter saved")}
                >
                  Save
                </Button>
              </div>
            </Filters>
          }
          items={filteredProducts}
          renderItem={(item) => {
            const { id, title, images } = item;
            const imageUrl = images?.edges?.[0]?.node?.url || "";
            return (
              <ResourceItem
                id={id}
                url=""
                accessibilityLabel={`Xem chi tiết sản phẩm ${title}`}
              >
                <Thumbnail source={imageUrl} alt="" />
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {title}
                </Text>
              </ResourceItem>
            );
          }}
        />
        <Pagination
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
          }}
          hasNext
          onNext={() => {
            console.log("Next");
          }}
        />
      </Card>
    </Page>
  );
};
