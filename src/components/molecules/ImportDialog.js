// ImportDialog — reusable import dialog: paste JSON manually or pick a file.
// Owns its own hidden file input; calls onImportFile(file) when a file is
// chosen and onSubmit(event) when the pasted text is submitted.
import { useRef } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ImportDialog = ({
  open,
  title = "Import",
  description,
  fieldLabel = "JSON",
  importText,
  onChangeText,
  onClose,
  onImportFile,
  onSubmit,
}) => {
  const fileInputRef = useRef(null);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    // Reset so picking the same file again still fires onChange.
    event.target.value = "";

    if (file) {
      onImportFile(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Stack spacing={0.5}>
          <Typography color="secondary.main" fontSize={24} fontWeight={700}>
            {title}
          </Typography>
          {description ? (
            <Typography color="#8a6a5c" fontSize={14}>
              {description}
            </Typography>
          ) : null}
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: "8px !important" }}>
        <Stack component="form" spacing={1.5} onSubmit={onSubmit}>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFileChange}
            hidden
          />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#8a6a5c" fontSize={14}>
              Upload a file or paste the JSON manually.
            </Typography>
            <Button
              type="button"
              onClick={handleChooseFile}
              variant="boardSecondary"
            >
              Choose file
            </Button>
          </Stack>

          <TextField
            label={fieldLabel}
            value={importText}
            onChange={onChangeText}
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

export default ImportDialog;
