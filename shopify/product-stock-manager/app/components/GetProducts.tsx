import type { Product, PageInfo } from "app/types/product";
import {
  DataTable,
  Card,
  Page,
  Thumbnail,
  Button,
  TextField,
  Pagination,
} from "@shopify/polaris";
import { useNavigate, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { HEADING_PRODUCT } from "app/types/constant";

type ProductsProps = {
  products: Product[];
  pageInfo: PageInfo;
};
export const GetProducts = ({ products, pageInfo }: ProductsProps) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchItem.toLowerCase()),
  );

  const isNavigating = navigation.state !== "idle";
  const productsWithoutId = products.map(({ id, ...rest }) => rest);
  const headings = HEADING_PRODUCT;
  const rows: string[][] = [];
  const ids: string[] = [];

  const handleViewDetails = (id: string) => {
    const encodedId = encodeURIComponent(id);
    navigate(`/app/product/${encodedId}`);
  };
  for (const product of filteredProducts) {
    const row = [];
    for (const [key, value] of Object.entries(product)) {
      if (key !== "id") {
        if (key === "images") {
          const imageUrl = value.edges[0]?.node?.url ?? "";
          row.push(<Thumbnail source={imageUrl} alt={product.title} />);
        } else if (key) {
          row.push(value);
        }
      } else {
        ids.push(value);
      }
    }
    row.push(
      <Button
        onClick={() => handleViewDetails(product.id)}
        variant="primary"
        size="slim"
        disabled={isNavigating}
      >
        View Details
      </Button>,
    );
    rows.push(row);
  }

  return (
    <Page title="Product Listing">
      <Card>
        <TextField
          label="Search Products"
          value={searchItem}
          onChange={setSearchItem}
          autoComplete="off"
        />
      </Card>
      <Card>
        <DataTable
          columnContentTypes={productsWithoutId.map(() => "text")}
          headings={headings}
          rows={rows}
        />
      </Card>
      <Card>
        <Pagination
          hasPrevious={pageInfo.hasPreviousPage}
          hasNext={pageInfo.hasNextPage}
          onNext={() => navigate(`/app/products?after=${pageInfo.endCursor}`)}
          onPrevious={() => navigate(`/app/products?before=${pageInfo.startCursor}`)}
        />
      </Card>
    </Page>
  );
};
