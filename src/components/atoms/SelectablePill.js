// SelectablePill — a pill-shaped, single-select chip used wherever the board
// shows "pick one of these" options (product/flavor/slot chips, quick-date
// buttons, moodboard tags). Owns the pill look + selected/unselected styling,
// sourced from theme.palette.boardPill so the colors live in ONE place.
import { Chip } from "@mui/material";

const SelectablePill = ({ label, selected = false, onClick, sx, ...rest }) => (
  <Chip
    label={label}
    size="small"
    clickable
    onClick={onClick}
    sx={[
      (theme) => ({
        fontWeight: 700,
        border: `1px solid ${theme.palette.boardPill.border}`,
        bgcolor: selected
          ? theme.palette.boardPill.bgSelected
          : theme.palette.boardPill.bg,
        color: selected
          ? theme.palette.boardPill.textSelected
          : theme.palette.boardPill.text,
        "& .MuiChip-label": {
          px: 1.1,
          fontSize: "0.82rem",
        },
      }),
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
    {...rest}
  />
);

export default SelectablePill;
