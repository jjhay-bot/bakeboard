import { Paper, Stack, Typography } from "@mui/material";

const DashboardSummaryCard = ({ value, label, tone, active = false, onClick }) => {
  const { background, border, valueColor, labelColor } = tone;

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 1.25,
        borderRadius: "18px",
        bgcolor: background,
        border: `1px solid ${border}`,
        cursor: onClick ? "pointer" : "default",
        boxShadow: active ? `0 0 0 2px ${border}` : "none",
        transform: active ? "translateY(-1px)" : "none",
        transition: "transform 120ms ease, box-shadow 120ms ease",
      }}
    >
      <Stack justifyContent="space-between" height="100%" spacing={0.5}>
        <Typography
          color={valueColor}
          fontSize={34}
          fontWeight={700}
          lineHeight={1}
          sx={{
            transform: "scaleY(1.2)",
            textAlign: "center",
          }}
        >
          {value}
        </Typography>
        <Typography
          color={labelColor}
          fontSize={11.5}
          fontWeight={620}
          sx={{
            letterSpacing: label.length > 10 ? "-0.75px" : "normal",
            whiteSpace: "nowrap",
            textAlign: "center",
            transform:
              label.length > 10
                ? "translateX(-4px) scaleY(1.25)"
                : "scaleY(1.25)",
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default DashboardSummaryCard;
