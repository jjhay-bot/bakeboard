import { useMemo, useRef, useState } from "react";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddOrderChipGroup from "./AddOrderChipGroup";
import {
  addOrderFlavorOptions,
  addOrderPaymentOptions,
  addOrderPickupSlotOptions,
  addOrderProductOptions,
  addOrderValueLabelMap,
  emptyAddOrderForm,
  formatAddOrderPickupDate,
  getAddOrderQuickDateOptions,
} from "./addOrderData";

const AddOrderForm = ({ submitLabel = "Save Draft" }) => {
  const [formValues, setFormValues] = useState(emptyAddOrderForm);
  const [savedOrder, setSavedOrder] = useState(null);
  const quickDateOptions = useMemo(() => getAddOrderQuickDateOptions(), []);
  const pickupDateInputRef = useRef(null);

  const handleChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSelect = (field) => (value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleOpenPickupDatePicker = () => {
    const input = pickupDateInputRef.current;

    if (!input) {
      return;
    }

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  };

  const orderPreview = useMemo(
    () => ({
      customerName: formValues.customerName.trim() || "Customer name",
      product: addOrderValueLabelMap[formValues.product],
      flavor: addOrderValueLabelMap[formValues.flavor],
      paymentStatus: addOrderValueLabelMap[formValues.paymentStatus],
      pickupSlot: addOrderValueLabelMap[formValues.pickupSlot],
      pickupDate: formatAddOrderPickupDate(formValues.pickupDate),
      themeNotes: formValues.themeNotes.trim() || "No theme notes yet",
    }),
    [formValues],
  );

  const canSave =
    formValues.customerName.trim() &&
    formValues.pickupDate &&
    formValues.product &&
    formValues.flavor &&
    formValues.paymentStatus;

  const handleSaveDraft = () => {
    if (!canSave) {
      return;
    }

    setSavedOrder(orderPreview);
  };

  return (
    <Stack spacing={1.5}>
      <Paper variant="boardPanel" elevation={0} sx={{ p: 1.5 }}>
        <Stack spacing={1.25}>
          <TextField
            label="Customer name"
            value={formValues.customerName}
            onChange={handleChange("customerName")}
            fullWidth
          />
          <Stack spacing={0.5}>
            <Typography color="secondary.main" fontSize={13} fontWeight={700}>
              Pickup date
            </Typography>
            {!formValues.pickupDate ? (
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={0.75}
                alignItems="center"
              >
                {quickDateOptions.map((option) => {
                  const isSelected = formValues.pickupDate === option.value;

                  return (
                    <Button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect("pickupDate")(option.value)}
                      sx={{
                        minWidth: "auto",
                        px: 1.4,
                        py: 0.7,
                        borderRadius: "999px",
                        bgcolor: isSelected ? "#ffe5dc" : "#fff6f0",
                        border: "1px solid #f2d7ca",
                        color: isSelected ? "#c85027" : "#8a6a5c",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                      }}
                    >
                      {option.label}
                    </Button>
                  );
                })}

                <IconButton
                  type="button"
                  aria-label="Pick custom date"
                  onClick={handleOpenPickupDatePicker}
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "12px",
                    bgcolor: "#fff6f0",
                    border: "1px solid #f2d7ca",
                    color: "secondary.main",
                  }}
                >
                  <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            ) : null}

            <input
              ref={pickupDateInputRef}
              type="date"
              value={formValues.pickupDate}
              onChange={handleChange("pickupDate")}
              min={quickDateOptions[0]?.value}
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
                width: 1,
                height: 1,
              }}
              tabIndex={-1}
            />
          </Stack>
          {formValues.pickupDate ? (
            <TextField
              type="date"
              label="Pickup date"
              value={formValues.pickupDate}
              onChange={handleChange("pickupDate")}
              fullWidth
              inputProps={{
                min: quickDateOptions[0]?.value,
              }}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          ) : null}
          <TextField
            label="Theme notes"
            value={formValues.themeNotes}
            onChange={handleChange("themeNotes")}
            placeholder="Optional color, peg, or design note"
            fullWidth
            multiline
            minRows={2}
          />

          <AddOrderChipGroup
            title="Product"
            options={addOrderProductOptions}
            value={formValues.product}
            onChange={handleSelect("product")}
          />
          <AddOrderChipGroup
            title="Flavor"
            options={addOrderFlavorOptions}
            value={formValues.flavor}
            onChange={handleSelect("flavor")}
          />
          <AddOrderChipGroup
            title="Payment"
            options={addOrderPaymentOptions}
            value={formValues.paymentStatus}
            onChange={handleSelect("paymentStatus")}
          />
          <AddOrderChipGroup
            title="Pickup slot"
            options={addOrderPickupSlotOptions}
            value={formValues.pickupSlot}
            onChange={handleSelect("pickupSlot")}
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
            {orderPreview.paymentStatus}
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
        disabled={!canSave}
      >
        {submitLabel}
      </Button>

      {savedOrder ? (
        <Paper variant="boardPanel" elevation={0} sx={{ p: 1.5 }}>
          <Stack spacing={0.5}>
            <Typography color="secondary.main" fontSize={15} fontWeight={700}>
              Draft saved
            </Typography>
            <Typography color="#8a5640" fontSize={14}>
              {savedOrder.customerName} • {savedOrder.product} •{" "}
              {savedOrder.paymentStatus}
            </Typography>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  );
};

export default AddOrderForm;
