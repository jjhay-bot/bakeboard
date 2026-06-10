import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import AddOrderForm from "./AddOrderForm";

const AddOrderDialog = ({ open, onClose, onSaveSuccess }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{
        sx: {
          width: "calc(100% - 1.5rem)",
          maxHeight: "80vh",
          m: 1.5,
        },
      }}
    >
      <DialogTitle sx={{ pb: 0.75, px: 2.25, pt: 2.25 }}>
        <Stack spacing={0.5}>
          <Typography color="#8a5640" fontSize={12} fontWeight={700}>
            Capture order
          </Typography>
          <Typography color="secondary.main" fontSize={22} fontWeight={700}>
            Add Order
          </Typography>
          <Typography color="#7f655b" fontSize={13}>
            Keep it fast: type the essentials and tap the repeated choices.
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: "6px !important", px: 2.25, pb: 2.25 }}>
        <AddOrderForm submitLabel="Save Draft" onSaveSuccess={onSaveSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;
