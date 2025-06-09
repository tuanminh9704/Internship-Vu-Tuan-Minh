import { DataTable, Page, Card, Pagination } from "@shopify/polaris";
import { heading } from "app/types/heading";
import type { Customer } from "app/types/customer";
import type { PageInfo } from "app/types/pageInfo";
import { useNavigate } from "@remix-run/react";

type CustomerProp = {
  customers: Customer[];
  pageInfo: PageInfo
};

export const CustomerTable = ({ customers, pageInfo }: CustomerProp) => {
    const navigate = useNavigate();
  const rows: [][] = [];

  for (const customer of customers) {
    const row: any = [];
    if (customer) {
      for (const [key, value] of Object.entries(customer)) {
        if (key === "points") {
          row.push(value.totalPoints);
        } else if (key !== "id" && key !== "customerIdShopify") {
          row.push(value);
        }
      }
    }
    rows.push(row);
  }
  return (
    <Page title="Customer manager">
      <Card>
        <DataTable
          columnContentTypes={rows.map(() => "text")}
          headings={heading}
          rows={rows}
        />
      </Card>
      <Card>
        <Pagination
          hasPrevious={pageInfo.hasPreviousPage}
          hasNext={pageInfo.hasNextPage}
          onNext={() => navigate(`/app/customers?after=${pageInfo.endCursor}`)}
          onPrevious={() =>
            navigate(`/app/customers?before=${pageInfo.startCursor}`)
          }
        />
      </Card>
    </Page>
  );
};
