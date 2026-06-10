import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import AddOrderChipGroup from "./AddOrderChipGroup";
import {
  addOrderFlavorOptions,
  addOrderPickupSlotOptions,
  addOrderProductOptions,
} from "./addOrderData";
import QuickDatePickerField from "../../atoms/QuickDatePickerField";
import useAddOrderForm from "./useAddOrderForm";

const AddOrderForm = ({ submitLabel = "Save Draft", onSaveSuccess }) => {
  const {
    formValues,
    isSaving,
    savedOrder,
    quickDateOptions,
    updateForm,
    orderPreview,
    canSave,
    handleSaveDraft,
  } = useAddOrderForm({ onSaveSuccess });

  return (
    <Stack spacing={1.5}>
      <Paper variant="boardPanel" elevation={0} sx={{ p: 1.5 }}>
        <Stack spacing={1.25}>
          <TextField
            label="Customer name"
            value={formValues.customerName}
            onChange={(event) => updateForm({ customerName: event.target.value })}
            fullWidth
          />

          <AddOrderChipGroup
            title="Product"
            options={addOrderProductOptions}
            value={formValues.product}
            onChange={(value) => updateForm({ product: value, flavor: "", paymentAmount: "" })}
          />

          <AddOrderChipGroup
            title="Flavor"
            options={addOrderFlavorOptions}
            value={formValues.flavor}
            onChange={(value) => updateForm({ flavor: value })}
          />

          <QuickDatePickerField
            label="Pickup date"
            value={formValues.pickupDate}
            presetOptions={quickDateOptions}
            onChange={(pickupDate) => updateForm({ pickupDate })}
            disablePast
            openPickerAriaLabel="Pick custom date"
          />

          <AddOrderChipGroup
            title="Pickup slot"
            options={addOrderPickupSlotOptions}
            value={formValues.pickupSlot}
            onChange={(value) => updateForm({ pickupSlot: value })}
          />

          <TextField
            size="small"
            label="Payment amount"
            value={formValues.paymentAmount}
            onChange={(event) => updateForm({ paymentAmount: event.target.value })}
            placeholder="0"
            fullWidth
            type="number"
            inputProps={{
              min: 0,
              step: 1,
              inputMode: "numeric",
            }}
          />

          <TextField
            label="Theme notes"
            value={formValues.themeNotes}
            onChange={(event) => updateForm({ themeNotes: event.target.value })}
            placeholder="Optional color, peg, or design note"
            fullWidth
            multiline
            minRows={2}
          />
        </Stack>
      </Paper>

      <Paper variant="boardPanel" elevation={0} sx={{ p: 1.5 }}>
        <Stack spacing={0.35}>
          <Typography color="#8a5640" fontSize={12} fontWeight={700}>
            Quick summary
          </Typography>
          <Typography color="#6e3f2f" fontSize={17} fontWeight={700}>
            {orderPreview.customerName}
          </Typography>
          <Typography color="#8a5640" fontSize={13}>
            {orderPreview.product} • {orderPreview.flavor}
          </Typography>
          <Typography color="#8a5640" fontSize={13}>
            {orderPreview.pickupDate} • {orderPreview.pickupSlot}
          </Typography>
          <Typography color="#8a5640" fontSize={13}>
            {orderPreview.paymentAmount || "No payment yet"} • {orderPreview.paymentStatus}
          </Typography>
          <Typography color="#9a7a6a" fontSize={13}>
            {orderPreview.themeNotes}
          </Typography>
        </Stack>
      </Paper>

      <Button
        type="button"
        variant="boardPrimary"
        onClick={handleSaveDraft}
        disabled={!canSave || isSaving}
      >
        {isSaving ? "Saving..." : submitLabel}
      </Button>

      {savedOrder ? (
        <Paper variant="boardPanel" elevation={0} sx={{ p: 1.5 }}>
          <Stack spacing={0.5}>
            <Typography color="secondary.main" fontSize={15} fontWeight={700}>
              Draft saved
            </Typography>
            <Typography color="#8a5640" fontSize={14}>
              {savedOrder.customerName} • {savedOrder.product} • {savedOrder.paymentStatus}
            </Typography>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
};

export default AddOrderForm;
