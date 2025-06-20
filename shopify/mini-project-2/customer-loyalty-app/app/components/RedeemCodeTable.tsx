import { Page, DataTable, Card, Badge } from "@shopify/polaris";
import type { RedeemCode } from "app/types/redeemCode";
import { headingRedeemPointTable } from "app/types/heading";
import { CursorPagination } from "./CursorPagination";
import { useNavigate } from "@remix-run/react";
import type { PageInfo } from "app/types/pageInfo";
import dayjs from "dayjs";
import { useState, useCallback } from "react";
import {
  OPTIONS_FILTER_REDEEMCODE,
  SORT_OPTIONS,
} from "app/constants/optionFilter";
import { Filter } from "./Filter";

type RedeemCodesProp = {
  redeemCodes: RedeemCode[];
  pageInfo: PageInfo;
};

export const RedeemCodeTable = ({ redeemCodes, pageInfo }: RedeemCodesProp) => {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

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

  const rows: any = [];
  for (const redeemCode of redeemCodes) {
    const row: any = [];
    if (redeemCode) {
      for (const [key, value] of Object.entries(redeemCode)) {
        if (key === "createdAt" || key === "expiresAt") {
          row.push(dayjs(value).format("HH:mm DD/MM/YYYY"));
        } else if (key === "isUsed") {
          row.push(
            <Badge tone={value ? "critical" : "success"}>
              {value ? "Used" : "Unused"}
            </Badge>,
          );
        } else if (key !== "id") {
          row.push(value);
        }
      }
    }
    rows.push(row);
  }

  return (
    <Page title="Sales by product">
      <Card>
        <Filter
          option={OPTIONS_FILTER_REDEEMCODE}
          handleSelectFilter={handleSelectFilter}
          selectedFilter={selectedFilter}
          sortOption={SORT_OPTIONS}
          handleSelectSort={handleSelectSort}
          selectedSort={selectedSort}
        />
      </Card>
      <Card>
        <DataTable
          columnContentTypes={rows[0]?.map(() => "text") || []}
          headings={headingRedeemPointTable}
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
