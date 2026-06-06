import { Paper, Stack, Typography } from "@mui/material";

const DashboardSummaryCard = ({ value, label, tone }) => {
  const { background, border, valueColor, labelColor } = tone;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.25,
        borderRadius: "18px",
        bgcolor: background,
        border: `1px solid ${border}`,
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
