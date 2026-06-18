import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ExpensesImportDialog = ({
  open,
  importText,
  onChange,
  onClose,
  onChooseFile,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Stack spacing={0.5}>
          <Typography color="secondary.main" fontSize={24} fontWeight={700}>
            Import expenses
          </Typography>
          <Typography color="#8a6a5c" fontSize={14}>
            Paste the exported expenses JSON here to merge it into your current
            list. Existing entries are kept; only new ones are added.
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: "8px !important" }}>
        <Stack component="form" spacing={1.5} onSubmit={onSubmit}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color="#8a6a5c" fontSize={14}>
              Upload a file or paste the JSON manually.
            </Typography>
            <Button type="button" onClick={onChooseFile} variant="boardSecondary">
              Choose file
            </Button>
          </Stack>

          <TextField
            label="Expenses JSON"
            value={importText}
            onChange={onChange}
            fullWidth
            multiline
            minRows={8}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end" pt={1}>
            <Button type="button" onClick={onClose} variant="boardSecondary">
              Cancel
            </Button>
            <Button type="submit" variant="boardPrimary">
              Import
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ExpensesImportDialog;
