import type { PointConfig } from "app/types/pointConfig";
import { Button, Page, Card, DataTable, InlineStack } from "@shopify/polaris";
import { headingPointConfigTable } from "app/types/heading";
import { Form, useNavigate } from "@remix-run/react";
import dayjs from "dayjs";
import { useState, useCallback, useEffect } from "react";
import { CursorPagination } from "./CursorPagination";
import {
  OPTIONS_FILTER_POINT_CONFIG,
  SORT_OPTIONS,
} from "app/constants/optionFilter";
import { ModalPointConfig } from "./ModalPointConfig";
import { Filter } from "./Filter";

type PointConfigsProp = {
  pointConfigs: PointConfig[];
  pageInfo: any;
};

export const PointConfigTable = ({
  pointConfigs,
  pageInfo,
}: PointConfigsProp) => {
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

  const [selectedId, setSelectedId] = useState<number | null>(() => {
    const selected = pointConfigs.find((c) => c.selected);
    return selected?.id ?? null;
  });

  const [editConfig, setEditConfig] = useState<PointConfig | null>(null);

  const handleEditClickUpdate = (config: PointConfig) => {
    setEditConfig(config);
  };

  const handleModalClose = () => {
    setEditConfig(null);
    setOpenModalCreate(false);
  };

  const rows = pointConfigs.map((pointConfig) => {
    const row: any[] = [];

    for (const [key, value] of Object.entries(pointConfig)) {
      const typedKey = key as keyof PointConfig;

      if (typedKey === "id" || typedKey === "createdAt") continue;

      if (typedKey === "updatedAt") {
        row.push(dayjs(value).format("HH:mm DD/MM/YYYY"));
      } else if (typedKey !== "selected") {
        row.push(value);
      }
    }

    // Select Button
    row.push(
      <Form method="post" onSubmit={() => setSelectedId(pointConfig.id)}>
        <input type="hidden" name="id" value={pointConfig.id} />
        <input type="hidden" name="actionType" value="selectPointConfig" />
        <Button
          variant={selectedId === pointConfig.id ? "primary" : "secondary"}
          size="slim"
          submit
        >
          {selectedId === pointConfig.id ? "Selected" : "Select"}
        </Button>
      </Form>,
    );

    // Delete Button
    row.push(
      <Form method="post">
        <input type="hidden" name="id" value={pointConfig.id} />
        <input type="hidden" name="actionType" value="deletePointConfig" />
        <Button variant="primary" tone="critical" submit>
          Delete
        </Button>
      </Form>,
    );

    row.push(
      <Button onClick={() => handleEditClickUpdate(pointConfig)}>
        Update
      </Button>,
    );

    return row;
  });

  const [earnRate, setEarnRate] = useState("");
  const [redeemRatePoint, setRedeemRatePoint] = useState("");
  const [redeemRateAmount, setRedeemRateAmount] = useState("");
  const [openModalCreate, setOpenModalCreate] = useState(false);

  const handleEarnRateChange = useCallback(
    (newValue: string) => setEarnRate(newValue),
    [],
  );
  const handleRedeemRatePointChange = useCallback(
    (newValue: string) => setRedeemRatePoint(newValue),
    [],
  );
  const handleRedeemRateAmountChange = useCallback(
    (newValue: string) => setRedeemRateAmount(newValue),
    [],
  );

  useEffect(() => {
    if (editConfig) {
      setEarnRate(String(editConfig.earnRate));
      setRedeemRatePoint(String(editConfig.redeemRatePoint));
      setRedeemRateAmount(String(editConfig.redeemRateAmount));
    }
  }, [editConfig]);

  return (
    <Page title="Point Config">
      <Card>
        <InlineStack gap="500" align="space-between">
          <Filter
            option={OPTIONS_FILTER_POINT_CONFIG}
            handleSelectFilter={handleSelectFilter}
            selectedFilter={selectedFilter}
            sortOption={SORT_OPTIONS}
            handleSelectSort={handleSelectSort}
            selectedSort={selectedSort}
          />
          <Button onClick={() => setOpenModalCreate(true)}>
            Add new config
          </Button>
        </InlineStack>
      </Card>
      {editConfig && (
        <ModalPointConfig
          handleModalClose={handleModalClose}
          editConfig={editConfig}
          handleEarnRateChange={handleEarnRateChange}
          handleRedeemRatePointChange={handleRedeemRatePointChange}
          handleRedeemRateAmountChange={handleRedeemRateAmountChange}
          earnRate={earnRate}
          redeemRatePoint={redeemRatePoint}
          redeemRateAmount={redeemRateAmount}
          title="updatePointConfig"
        />
      )}
      {openModalCreate && (
        <ModalPointConfig
          handleModalClose={handleModalClose}
          editConfig={null}
          handleEarnRateChange={handleEarnRateChange}
          handleRedeemRatePointChange={handleRedeemRatePointChange}
          handleRedeemRateAmountChange={handleRedeemRateAmountChange}
          earnRate={earnRate}
          redeemRatePoint={redeemRatePoint}
          redeemRateAmount={redeemRateAmount}
          title="createPointConfig"
        />
      )}

      {rows.length > 0 ? (
        <>
          <Card>
            <DataTable
              columnContentTypes={rows[0].map(() => "text")}
              headings={headingPointConfigTable}
              rows={rows}
            />
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CursorPagination pageInfo={pageInfo} navigate={navigate} />
            </div>{" "}
          </Card>
        </>
      ) : (
        "Point config is not found!"
      )}
    </Page>
  );
};
