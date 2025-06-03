import type { Variant, BaseProduct, VariantSelected } from "app/types/product";
import {
  Page,
  Text,
  Button,
  BlockStack,
  Card,
  InlineStack,
  Modal,
  Frame,
  Toast,
  TextField,
  Select,
} from "@shopify/polaris";
import { Form, useSubmit, useActionData } from "@remix-run/react";
import { SkeletonLoading } from "./SkeletonLoading";
import { useState, useEffect, useCallback } from "react";
import { fomatSelectedOption } from "app/utils/fomatSelectedOption";
import { ErrorBoundaryComponent } from "./ErrorBoundary";

type ProductProp = {
  baseProduct: BaseProduct;
  variants: Variant[];
  optionValuesMapObjRecordKeys: string[];
  variantSelected: VariantSelected;
  isLoading: boolean;
};

export function ErrorBoundary() {
  return <ErrorBoundaryComponent />;
}

export const GetProductDetail = ({
  baseProduct,
  variants,
  variantSelected,
  optionValuesMapObjRecordKeys,
  isLoading,
}: ProductProp) => {
  const [variantSelectedState, setVariantSelectedState] =
    useState(variantSelected);
  const optionsSelected = variantSelectedState.optionValuesVariant;
  const fomatOptionsSelected = fomatSelectedOption(optionsSelected);
  const [optionSelected, setOptionSelected] = useState(fomatOptionsSelected);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = useCallback(
    () => setOpenModal(!openModal),
    [openModal],
  );
  const [price, setPrice] = useState(variantSelectedState.price);
  // const [variantId, setVariantId] = useState(
  //   variantSelectedState.inventoryItem.id,
  // );

  // Location
  const optionsLocation = baseProduct.allLocation.map((location: string) => ({
    label: location,
    value: location,
  }));
  const [selectedLocation, setSelectedLocation] = useState(
    optionsLocation[0].value,
  );
  const handleSelectLocationChange = useCallback(
    (value: string) => setSelectedLocation(value),
    [],
  );

  const [quantityWithLocation, setQuantityWithLocation] = useState(0);
  const [compareQuantity, setCompareQuantity] = useState(0);
  const [locationId, setLocationId] = useState("");
  // set su thay doi quantity khi thay doi location
  useEffect(() => {
    const variantSelectedWithLocation =
      variantSelectedState.inventoryItem.inventoryLevels.edges.find(
        (item: any) => item.node.location.name === selectedLocation,
      );
    const quantityWithLoc =
      variantSelectedWithLocation?.node?.quantities[0].quantity || 0;
    if (variantSelectedWithLocation?.node?.location?.id) {
      setLocationId(variantSelectedWithLocation?.node?.location?.id);
    }
    setCompareQuantity(quantityWithLoc);
    setQuantityWithLocation(quantityWithLoc);
  }, [selectedLocation, variantSelectedState]);

  useEffect(() => {
    setPrice(variantSelectedState.price);
    // setVariantId(variantSelectedState.inventoryItem.id);
  }, [variantSelectedState]);

  // Cập nhật variant khi đổi options
  useEffect(() => {
    const newVariantSelected = variants.find((variant: any) =>
      Object.entries(optionSelected).every(
        ([name, value]) => variant.fomatOptionsSelected[name] === value,
      ),
    );

    if (newVariantSelected) {
      setVariantSelectedState(newVariantSelected);
      const url = new URL(window.location.href);
      url.searchParams.set("variantId", newVariantSelected.id);
      window.history.replaceState(null, "", url.toString());
    }
    else {
      alert('Không tồn tại sản phẩm!');
    }
  }, [optionSelected, variants]);

  const submit = useSubmit();
  const actionData : any = useActionData();
  const [showToast, setShowToast] = useState(false);  
  const [toastMessage, setToastMessage] = useState("");
  const [toastError, setToastError] = useState(true);
    useEffect(() => {
    if (actionData?.success) {
      setToastMessage('Updated succesfully!')
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      setToastError(false)
    }
  }, [actionData]);
  const handleSubmit = () => {

    submit(
      {
        price: price.toString(),
        quantity: quantityWithLocation.toString(),
        compareQuantity: compareQuantity,
        variantId: variantSelectedState.id,
        productId: baseProduct.id,
        inventoryItemId: variantSelectedState.inventoryItem.id,
        locationId: locationId,
      },
      { method: "POST" },
    );
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <Frame>
      {showToast && (
        <Toast content={toastMessage} error={toastError} onDismiss={() => setShowToast(false)} />
      )}{" "}
      <Page
        title={baseProduct.title}
        primaryAction={{
          content: "Update Product",
          onAction: () => {
            setOpenModal(true);
          },
        }}
      >
        <Form method="POST" onSubmit={handleSubmit}>
          <Modal
            open={openModal}
            onClose={handleOpenModal}
            title="Update Product"
            primaryAction={{
              content: "Save",
              onAction: handleSubmit,
            }}
            secondaryActions={[
              {
                content: "Cancel",
                onAction: handleOpenModal,
              },
            ]}
          >
            <Modal.Section>
              <BlockStack gap="300">
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={price.toString()}
                  onChange={(value) => setPrice(Number(value))}
                  autoComplete="off"
                />
                <TextField
                  label="Quantity"
                  type="number"
                  name="quantity"
                  value={quantityWithLocation.toString()}
                  onChange={(value) => setQuantityWithLocation(Number(value))}
                  autoComplete="off"
                />
              </BlockStack>
            </Modal.Section>
          </Modal>
        </Form>
        <Card padding="400">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
              <img
                src={baseProduct.images.length > 0 ? baseProduct.images[0] : ""}
                alt="Áo Nam"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  objectFit: "cover",
                }}
              />
            </div>

            <div style={{ flex: "2 1 400px", minWidth: "300px" }}>
              <BlockStack gap="200">
                <Text as="h3" variant="headingLg">
                  {baseProduct.title}
                </Text>
                <Text as="h3" variant="bodyMd" tone="subdued">
                  <strong>Price: </strong> {variantSelectedState.price}
                </Text>
                <Text as="h3" variant="bodyMd" tone="subdued">
                  <strong>Quantity: </strong> {quantityWithLocation}
                </Text>
                <Text as="h3">
                  <strong>Description: </strong>
                  {baseProduct.description}
                </Text>
                <Select
                  label="Location options"
                  options={optionsLocation}
                  value={selectedLocation}
                  onChange={handleSelectLocationChange}
                />
                <InlineStack gap="100">
                  <Text as="h3">
                    <strong>Color: </strong>
                  </Text>
                  {baseProduct.optionValuesMapObj.Color ? (
                    baseProduct.optionValuesMapObj.Color.map(
                      (color: string, index: number) => {
                        const isSelected = optionSelected.Color === color;

                        return (
                          <InlineStack gap="100" key={index}>
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                display: "flex",
                                backgroundColor: color,
                                borderRadius: "50%",
                                border: isSelected ? "3px solid #0000ff" : "",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setOptionSelected((prev) => ({
                                  ...prev,
                                  Color: color,
                                }))
                              }
                            />
                          </InlineStack>
                        );
                      },
                    )
                  ) : (
                    <Text as="p">Not found color</Text>
                  )}
                </InlineStack>

                {optionValuesMapObjRecordKeys.length > 0 &&
                  optionValuesMapObjRecordKeys.map(
                    (key: string, index: number) => (
                      <>
                        <Text as="h3" key={index}>
                          <strong>{key}: </strong>
                        </Text>
                        <div style={{ display: "flex", gap: "10px" }}>
                          {baseProduct.optionValuesMapObj[key].map(
                            (item: string, index: number) => (
                              <InlineStack key={index}>
                                <Button
                                  variant={
                                    fomatOptionsSelected[key] === item
                                      ? "primary"
                                      : "secondary"
                                  }
                                  onClick={() =>
                                    setOptionSelected((prev) => ({
                                      ...prev,
                                      [key]: item,
                                    }))
                                  }
                                >
                                  {item}
                                </Button>
                              </InlineStack>
                            ),
                          )}
                        </div>
                      </>
                    ),
                  )}
              </BlockStack>
            </div>
          </div>
        </Card>
      </Page>
    </Frame>
  );
};
