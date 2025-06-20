import { Page, Card, DataTable, Button, Toast } from "@shopify/polaris";
import type { Review } from "app/types/reviews";
import dayjs from "dayjs";
import { headingReviewsTable } from "app/types/heading";
import type { PageInfo } from "app/types/pageInfo";
import { CursorPagination } from "./CursorPagination";
import { useNavigate } from "@remix-run/react";
import { useState, useCallback, useEffect } from "react";
import { Filter } from "./Filter";
import {
  OPTIONS_FILTER_REVIEWS,
  SORT_OPTIONS,
} from "app/constants/optionFilter";

type ReviewsProp = {
  reviews: Review[];
  pageInfo: PageInfo;
};

export const ReviewTable = ({ reviews, pageInfo }: ReviewsProp) => {
  const navigate = useNavigate();

  const [reviewList, setReviewList] = useState<Review[]>(reviews);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [toastActive, setToastActive] = useState(false);
  const toggleToast = useCallback(
    () => setToastActive((active) => !active),
    [],
  );
  const toastMarkup = toastActive ? (
    <Toast content="Approved successfully!" onDismiss={toggleToast} />
  ) : null;
  useEffect(() => {
    setReviewList(reviews);
  }, [reviews]);
  const handleSelectFilter = useCallback(
    (value: string) => {
      setSelectedFilter(value);
      const url = new URL(window.location.href);

      if (value) {
        url.searchParams.set("sortBy", value);
        url.searchParams.set("order", "asc");
      } else {
        url.search = "";
      }

      navigate(url.pathname + url.search);
    },
    [navigate],
  );

  const handleSelectSort = useCallback(
    (value: string) => {
      setSelectedSort(value);
      const url = new URL(window.location.href);

      if (value) {
        url.searchParams.set("order", value);
      } else {
        url.search = "";
      }

      navigate(url.pathname + url.search);
    },
    [navigate],
  );

  const handleApprove = async (reviewId: string) => {
    try {
      const formData = new FormData();
      formData.append("reviewId", reviewId);

      const response = await fetch(`/app/reviews`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setReviewList((prev) =>
          prev.map((r) =>
            String(r.id) === reviewId ? { ...r, isApproved: true } : r,
          ),
        );
        toggleToast();
      } else {
        console.error("Approve failed", await response.text());
      }
    } catch (error) {
      console.error("Approve failed", error);
    }
  };

  const rows: any[] = [];
  for (const review of reviewList) {
    const row: any[] = [];

    for (const [key, value] of Object.entries(review)) {
      if (key === "createdAt") {
        row.push(dayjs(value).format("HH:mm DD/MM/YYYY"));
      } else if (key === "isApproved") {
        row.push(
          <Button
            tone={value ? "success" : "critical"}
            size="slim"
            onClick={() => {
              if (!value) handleApprove(String(review.id));
            }}
          >
            {value ? "Approved" : "Approve"}
          </Button>,
        );
      } else if (key !== "id" && key !== "customerId") {
        row.push(value);
      }
    }

    rows.push(row);
  }

  return (
    <Page>
      {toastMarkup}
      <Card>
        <Filter
          option={OPTIONS_FILTER_REVIEWS}
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
          headings={headingReviewsTable}
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
