import { Grid2, LinearProgress, Paper, Stack, Typography } from "@mui/material";

const DashboardProgressCard = ({
  title,
  valueText,
  progress,
  progressLabel,
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
    <Grid2 container spacing={2.5} px={2} alignItems="center">
      <Grid2 flex={1}>
        <Stack spacing={0.1}>
          <Grid2
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography color={barColor} fontSize={12} fontWeight={700}>
              {title}
            </Typography>{" "}
          </Grid2>

          <Grid2 container spacing={2.5} alignItems="center">
            <Grid2 flex={1}>
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
            </Grid2>
            <Typography color={barColor} fontSize={16} fontWeight={700}>
              {valueText}
            </Typography>
          </Grid2>
        </Stack>
      </Grid2>
    </Grid2>

    // INIT design, but taking much space for mobile screen

    // <Paper
    //   elevation={0}
    //   sx={{
    //     p: 2,
    //     py: 1,
    //     borderRadius: "20px",
    //     bgcolor: background,
    //     border: `1px solid ${border}`,
    //   }}
    // >
    //   <Stack spacing={0.5}>
    //     <Stack
    //       direction="row"
    //       justifyContent="space-between"
    //       alignItems="center"
    //       spacing={1}
    //     >
    //       <Typography color={titleColor} fontSize={14} fontWeight={700}>
    //         {title}:
    //       </Typography>
    //       <Typography color={valueColor} fontSize={20} fontWeight={700}>
    //         {valueText}
    //       </Typography>
    //     </Stack>

    //     <LinearProgress
    //       variant="determinate"
    //       value={progress}
    //       sx={{
    //         height: 10,
    //         borderRadius: 999,
    //         bgcolor: trackColor,
    //         "& .MuiLinearProgress-bar": {
    //           borderRadius: 999,
    //           bgcolor: barColor,
    //         },
    //       }}
    //     />

    //     <Typography color={helperColor} fontSize={12} fontWeight={600}>
    //       {helperText}
    //     </Typography>
    //   </Stack>
    // </Paper>
  );
};

export default DashboardProgressCard;
