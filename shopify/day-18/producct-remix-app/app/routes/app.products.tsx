import { json } from "@remix-run/node";
import { createApolloClient } from "../graphql/apolloClient";
import { GET_PRODUCTS } from "app/graphql/queries/product";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  ResourceList,
  ResourceItem,
  Text,
  Button,
  Card,
} from "@shopify/polaris";
import stylesUrl from "./app.products.module.css";
import type { Product } from "../interaface/product";

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export const loader = async () => {
  const client = createApolloClient();

  const { data } = await client.query({
    query: GET_PRODUCTS,
  });

  return json(data.products.nodes);
};

export default function ProductList() {
  const productsList: Product[] = useLoaderData<Product[]>();

  return (
    <Page
      title="Danh sách sản phẩm"
      primaryAction={{ content: "Thêm sản phẩm" }}
    >
      <Card>
        <ResourceList
          items={productsList}
          renderItem={(item) => {
            const { id, title, images } = item;

            const imageUrl = images?.edges?.[0]?.node?.url || "";

            return (
              <ResourceItem
                id={id}
                url=""
                accessibilityLabel={`Xem chi tiết sản phẩm ${title}`}
              >
                <div className={stylesUrl.productItem}>
                  <img
                    className={stylesUrl.productImage}
                    src={imageUrl}
                    alt=""
                  />
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {title}
                  </Text>
                </div>
                <Button>Xóa</Button>
              </ResourceItem>
            );
          }}
        />
      </Card>
    </Page>
  );
}
