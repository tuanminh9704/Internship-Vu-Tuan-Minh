import type { CustomerDetail } from "app/types/customer";
import {
  Card,
  Page,
  BlockStack,
  Text,
  ResourceList,
  ResourceItem,
} from "@shopify/polaris";
import dayjs from "dayjs";

type CustomerDetailProp = {
  customer: CustomerDetail;
};

export const CustomerDetailComponent = ({ customer }: CustomerDetailProp) => {
  return (
    <Page title="Customer Detail">
      <Card>
        <BlockStack>
          <Text as="p">
            <strong>First Name: </strong>
            {customer.firstName}
          </Text>

          <Text as="p">
            <strong>Last Name: </strong>
            {customer.lastName}
          </Text>
          <Text as="p">
            <strong>Name : </strong>
            {customer.name}
          </Text>
          <Text as="p">
            <strong>Email: </strong>
            {customer.email}
          </Text>
          <Text as="p">
            <strong>Points: </strong>
            {customer.points.totalPoints}
          </Text>
        </BlockStack>
      </Card>

      <Card>
        <Text as="h1">
          <strong>Points Log: </strong>
        </Text>
        <ResourceList
          resourceName={{ singular: "log", plural: "logs" }}
          items={customer.pointLogs}
          renderItem={(log) => {
            const { id, change, reason, type, createdAt } = log;
            return (
              <ResourceItem id={String(id)} onClick={() => console.log("OK")}>
                <Text as="p">
                  <strong>Change: </strong>
                  {change > 0 ? `+${change}` : `${change}`}
                </Text>
                <Text as="p">
                  <strong>type: </strong>
                  {type}
                </Text>
                <Text as="p">
                  <strong>Reason: </strong>
                  {reason ? reason : ""}
                </Text>
                <Text as="p">
                  <strong>createdAt: </strong>
                  {dayjs(createdAt).format("HH:mm DD/MM/YYYY")}
                </Text>
              </ResourceItem>
            );
          }}
        />
      </Card>
    </Page>
  );
};
