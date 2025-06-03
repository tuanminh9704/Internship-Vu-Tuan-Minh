import { Page, Card } from "@shopify/polaris";
import type { ProductStatistics } from "app/types/product";

interface ProductStatisticsProp {
  productStatistics: ProductStatistics
}

export const DashBoardPage = ({productStatistics} : ProductStatisticsProp) => {
  return (
    <Page>
      <Card>
        <p>Sản phẩm trong app: {productStatistics.countProduct.count}</p>
      </Card>
      <Card>
        <p>Sản phẩm có trong kho: {productStatistics.inventoryTotal}</p>
      </Card>
      <Card>
        <p>Sản phẩm đang khuyến mãi: {productStatistics.totalDiscountProduct}</p>
      </Card>
    </Page>
  );
};
