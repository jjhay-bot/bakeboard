import { LinearProgress, Paper, Stack, Typography } from "@mui/material";

const DashboardProgressCard = ({
  title,
  valueText,
  progress,
  helperText,
  tone,
}) => {
  const {
    background,
    border,
    titleColor,
    valueColor,
    helperColor,
    trackColor,
    barColor,
  } = tone;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        py: 1,
        borderRadius: "20px",
        bgcolor: background,
        border: `1px solid ${border}`,
      }}
    >
      <Stack spacing={0.5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography color={titleColor} fontSize={14} fontWeight={700}>
            {title}:
          </Typography>
          <Typography color={valueColor} fontSize={20} fontWeight={700}>
            {valueText}
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 999,
            bgcolor: trackColor,
            "& .MuiLinearProgress-bar": {
              borderRadius: 999,
              bgcolor: barColor,
            },
          }}
        />

        <Typography color={helperColor} fontSize={12} fontWeight={600}>
          {helperText}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default DashboardProgressCard;
