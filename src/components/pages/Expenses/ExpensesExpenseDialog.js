import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SelectablePill from "../../atoms/SelectablePill";

const ExpensesExpenseDialog = ({
  open,
  formValues,
  isEditing,
  onClose,
  onChange,
  onSelectField,
  onSubmit,
  categoryOptions,
  paymentChannelOptions,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Stack spacing={0.5}>
          <Typography color="secondary.main" fontSize={24} fontWeight={700}>
            {isEditing ? "Update expense" : "Add expense"}
          </Typography>
          <Typography color="#8a6a5c" fontSize={14}>
            Log what you spent. Pick a category and payment channel, add a note
            if it helps you remember.
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: "8px !important" }}>
        <Stack component="form" spacing={1.5} onSubmit={onSubmit}>
          <TextField
            label="Amount"
            type="number"
            value={formValues.amount}
            onChange={onChange("amount")}
            required
            fullWidth
            inputProps={{ min: 0, step: "0.01", inputMode: "decimal" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">₱</InputAdornment>
              ),
            }}
          />

          <Autocomplete
            options={categoryOptions}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option, selected) =>
              option.value === selected.value
            }
            value={
              categoryOptions.find(
                (option) => option.value === formValues.category,
              ) || null
            }
            onChange={(_, nextOption) =>
              onSelectField("category", nextOption ? nextOption.value : "")
            }
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="Category" required fullWidth />
            )}
          />

          <Stack spacing={0.75}>
            <Typography color="secondary.main" fontSize={14} fontWeight={700}>
              Payment channel
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {paymentChannelOptions.map((option) => (
                <SelectablePill
                  key={option.value}
                  label={option.label}
                  selected={formValues.paymentChannel === option.value}
                  onClick={() => onSelectField("paymentChannel", option.value)}
                />
              ))}
            </Stack>
          </Stack>

          <TextField
            label="Note"
            value={formValues.note}
            onChange={onChange("note")}
            placeholder="Optional"
            fullWidth
            multiline
            minRows={2}
          />

          <TextField
            label="Date"
            type="date"
            value={formValues.date}
            onChange={onChange("date")}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            helperText="Defaults to today — change only if needed."
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end" pt={1}>
            <Button type="button" onClick={onClose} variant="boardSecondary">
              Cancel
            </Button>
            <Button type="submit" variant="boardPrimary">
              {isEditing ? "Update expense" : "Save expense"}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ExpensesExpenseDialog;
