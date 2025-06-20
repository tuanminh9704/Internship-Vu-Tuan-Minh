import { Form } from "@remix-run/react";
import { Modal, BlockStack, TextField } from "@shopify/polaris";

type ModelUpdateProp = {
  handleModalClose: any;
  editConfig: any;
  handleEarnRateChange: any;
  handleRedeemRatePointChange: any;
  handleRedeemRateAmountChange: any;
  earnRate: any,
  redeemRatePoint: any,
  redeemRateAmount : any,
  title: string
};

export const ModalPointConfig = ({
  handleModalClose,
  editConfig,
  handleEarnRateChange,
  handleRedeemRatePointChange,
  handleRedeemRateAmountChange,
  earnRate,
  redeemRatePoint,
  redeemRateAmount,
  title
}: ModelUpdateProp) => {
  return (
    <Modal
      open={true}
      onClose={handleModalClose}
      title={title}
      primaryAction={{
        content: "Save",
        onAction: () => {
          const form = document.getElementById(
            "update-form",
          ) as HTMLFormElement;
          if (form) form.submit();
          handleModalClose();
        },
      }}
      secondaryActions={[{ content: "Cancel", onAction: handleModalClose }]}
    >
      <Modal.Section>
        <Form method="post" id="update-form">
          <input type="hidden" name="id" value={editConfig?.id || ''} />
          <input type="hidden" name="actionType" value={title} />
          <BlockStack gap="300">
            <TextField
              label="Earn Rate"
              name="earnRate"
              type="number"
              value={String(earnRate)}
              onChange={handleEarnRateChange}
              autoComplete="off"
            />
            <TextField
              label="Redeem Rate Point"
              name="redeemRatePoint"
              type="number"
              value={String(redeemRatePoint)}
              onChange={handleRedeemRatePointChange}
              autoComplete="off"
            />
            <TextField
              label="Redeem Rate Amount"
              name="redeemRateAmount"
              type="number"
              value={String(redeemRateAmount)}
              onChange={handleRedeemRateAmountChange}
              autoComplete="off"
            />
          </BlockStack>
        </Form>
      </Modal.Section>
    </Modal>
  );
};
