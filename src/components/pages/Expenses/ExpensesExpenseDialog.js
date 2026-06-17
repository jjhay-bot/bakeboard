import { useRef } from "react";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
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
  imagePreviewUrl,
  onPickImage,
  onRemoveImage,
}) => {
  const imageInputRef = useRef(null);

  const handleChooseImage = () => {
    imageInputRef.current?.click();
  };

  const handleImageInputChange = (event) => {
    const [file] = event.target.files || [];

    onPickImage(file);
    // Reset so picking the same file again still fires onChange.
    event.target.value = "";
  };

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

          <Stack spacing={0.75}>
            <Typography color="secondary.main" fontSize={14} fontWeight={700}>
              Receipt (optional)
            </Typography>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageInputChange}
              hidden
            />

            {imagePreviewUrl ? (
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #f2d7ca",
                }}
              >
                <Box
                  component="img"
                  src={imagePreviewUrl}
                  alt="Receipt preview"
                  sx={{ display: "block", width: "100%", maxHeight: 240, objectFit: "cover" }}
                />
                <IconButton
                  aria-label="Remove receipt"
                  onClick={onRemoveImage}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(255,255,255,0.85)",
                    color: "#c85027",
                    "&:hover": { bgcolor: "#fff" },
                  }}
                >
                  ✕
                </IconButton>
              </Box>
            ) : (
              <Button
                type="button"
                onClick={handleChooseImage}
                variant="boardSecondary"
                startIcon={<PhotoCameraRoundedIcon />}
              >
                Add photo
              </Button>
            )}
          </Stack>

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
