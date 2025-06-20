import {
  DataTable,
  Page,
  Card,
  Button,
  TextField,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";
import { heading } from "app/types/heading";
import type { Customer } from "app/types/customer";
import type { PageInfo } from "app/types/pageInfo";
import { useNavigate, useNavigation, useFetcher } from "@remix-run/react";
import { OPTIONS_FILTER, SORT_OPTIONS } from "app/constants/optionFilter";
import { useState, useCallback, useEffect } from "react";
import { CursorPagination } from "./CursorPagination";
import { Filter } from "./Filter";

type CustomerProp = {
  customers: Customer[];
  pageInfo: PageInfo;
};

export const CustomerTable = ({ customers, pageInfo }: CustomerProp) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSelectFilter = useCallback((value: string) => {
    setSelectedFilter(value);
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("sortBy", value);
      url.searchParams.set("order", "asc");
    } else {
      url.search = "";
    }

    navigate(url.pathname + url.search);
  }, []);

  const handleSelectSort = useCallback((value: string) => {
    setSelectedSort(value);
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("order", value);
    } else {
      url.search = "";
    }

    navigate(url.pathname + url.search);
  }, []);

  const handleChange = useCallback(
    (newValue: string) => {
      setSearchValue(newValue);

      const url = new URL(window.location.href);

      if (newValue) {
        url.searchParams.set("name", newValue);
      } else {
        url.search = "";
      }

      navigate(url.pathname + url.search);
    },
    [navigate],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "";
    setSearchValue(name);
  }, []);

  // handle get customer and pagination
  const navigation = useNavigation();
  const rows: [][] = [];
  const isNavigating = navigation.state !== "idle";
  const handleViewDetails = (id: string) => {
    const encodedId = encodeURIComponent(id);
    navigate(`/app/customer/${encodedId}`);
  };

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
    row.push(
      <Button
        onClick={() => handleViewDetails(customer.id.toString())}
        variant="primary"
        size="slim"
        disabled={isNavigating}
      >
        View Details
      </Button>,
    );
    rows.push(row);
  }
  const handleSync = () => {
    fetcher.submit({ actionType: "syncCustomers" }, { method: "post" });
  };

  return (
    <Page title="Customer manager">
      <Card>
        <BlockStack>
          <TextField
            label="Search"
            value={searchValue}
            onChange={handleChange}
            autoComplete="off"
          />
          <InlineStack align="space-between">
            <Filter
              option={OPTIONS_FILTER}
              handleSelectFilter={handleSelectFilter}
              selectedFilter={selectedFilter}
              sortOption={SORT_OPTIONS}
              handleSelectSort={handleSelectSort}
              selectedSort={selectedSort}
            />
            <div style={{ maxWidth: "150px", marginTop: "30px" }}>
              <Button
                size="medium"
                onClick={handleSync}
                loading={fetcher.state !== "idle"}
              >
                Sync Customers
              </Button>
            </div>
          </InlineStack>
        </BlockStack>
      </Card>
      <Card>
        <DataTable
          columnContentTypes={rows[0]?.map(() => "text") || []}
          headings={heading}
          rows={rows}
        />
      </Card>
      <Card>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CursorPagination pageInfo={pageInfo} navigate={navigate} />
        </div>{" "}
      </Card>
    </Page>
  );
};
