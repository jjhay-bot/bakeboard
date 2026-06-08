import { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const statusStyles = {
  active: {
    label: "Active",
    color: "#8f4f39",
    backgroundColor: "rgba(255,255,255,0.68)",
  },
  done: {
    label: "Done",
    color: "#4c7453",
    backgroundColor: "rgba(239, 255, 241, 0.82)",
  },
};

const MoodboardNoteCard = ({ note, onEdit, onToggleStatus }) => {
  const status = statusStyles[note.status] || statusStyles.active;
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleOpenMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    onEdit(note);
  };

  const handleToggleStatus = () => {
    handleCloseMenu();
    onToggleStatus(note);
  };

  return (
    <Paper
      variant="boardNote"
      elevation={0}
      sx={{
        minHeight: note.minHeight,
        p: 2,
        bgcolor: note.tone,
        transform: `rotate(${note.rotation})`,
        // maxWidth: "50vw"
      }}
    >
      <Box
        component="button"
        type="button"
        aria-label={`More actions for ${note.title}`}
        onClick={handleOpenMenu}
        sx={{
          position: "absolute",
          top: note.tapeOffset.top,
          right: note.tapeOffset.right,
          width: 38,
          height: 18,
          bgcolor: "rgba(255,255,255,0.45)",
          borderRadius: "4px",
          transform: "rotate(8deg)",
          border: 0,
          cursor: "pointer",
          appearance: "none",
          transition: "background-color 120ms ease",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.72)",
          },
        }}
      />

      <Stack spacing={1.25}>
        <Box
          sx={{
            display: "inline-flex",
            alignSelf: "flex-start",
            px: 1,
            py: 0.5,
            borderRadius: "999px",
            bgcolor: "rgba(255,255,255,0.5)",
            color: "secondary.main",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {note.tag}
        </Box>

        {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box
            sx={{
              display: "inline-flex",
              px: 1,
              py: 0.5,
              borderRadius: "999px",
              bgcolor: status.backgroundColor,
              color: status.color,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {status.label}
          </Box>
        </Stack> */}

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleToggleStatus}>
            Mark as {note.status === "done" ? "active" : "done"}
          </MenuItem>
        </Menu>

        {note.image ? (
          <Box
            sx={{
              height: 118,
              borderRadius: "12px",
              background: note.image.src
                ? `url(${note.image.src}) center / cover no-repeat`
                : note.image.background,
              border: "1px solid rgba(110, 63, 47, 0.08)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 10,
                bottom: 10,
                px: 1,
                py: 0.5,
                borderRadius: "999px",
                bgcolor: "rgba(255,255,255,0.72)",
                color: "secondary.main",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              {note.image.label}
            </Box>
          </Box>
        ) : null}

        <Stack spacing={0.75}>
          <Typography color="secondary.main" fontSize={16} fontWeight={700}>
            {note.title}
          </Typography>
          <Typography
            color="#6f5a4f"
            fontSize={14}
            lineHeight={1.6}
            sx={note.status === "done" ? { opacity: 0.72 } : undefined}
          >
            {note.body}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default MoodboardNoteCard;
