// DataToolbar — reusable toolbar for a dataset: import, download (export), and
// reset/clear. Used by any list/board-style screen (orders, moodboard). Pure
// UI: it renders the buttons and calls the handlers it's given.
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const actionButtonSx = {
  borderRadius: "14px",
  bgcolor: "#fff6f0",
  color: "secondary.main",
  border: "1px solid #f2d7ca",
  "&:hover": { bgcolor: "#ffece3" },
};

const DataToolbar = ({
  title = "Actions",
  importLabel = "Import",
  downloadLabel = "Download as JSON",
  resetLabel = "Delete all",
  onImport,
  onDownload,
  onReset,
}) => (
  <Paper variant="boardPanel" elevation={0} sx={{ p: 2 }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography color="secondary.main" fontSize={16} fontWeight={700}>
        {title}
      </Typography>

      <Stack direction="row" spacing={1}>
        <IconButton aria-label={importLabel} onClick={onImport} sx={actionButtonSx}>
          <FileUploadRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          aria-label={downloadLabel}
          onClick={onDownload}
          sx={actionButtonSx}
        >
          <FileDownloadRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          aria-label={resetLabel}
          onClick={onReset}
          sx={{ ...actionButtonSx, color: "#c85027" }}
        >
          <RestartAltRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
    </Stack>
  </Paper>
);

export default DataToolbar;
