// DashboardScreenSkeleton — loading mirror of DashboardScreen. Rendered as a
// full-screen swap while orders load, then replaced by the real content. Shapes
// and spacing track DashboardScreen so the swap doesn't shift layout.
import { Grid2, Skeleton, Stack } from "@mui/material";
import ScreenContainer from "../layout/ScreenContainer";

const SUMMARY_PLACEHOLDERS = ["total", "paid", "downpayment", "unpaid"];
const ORDER_PLACEHOLDERS = ["a", "b", "c", "d"];

const DashboardScreenSkeleton = () => {
  return (
    <ScreenContainer sx={{ bgcolor: "#fffaf6" }} fadeTimeout={60}>
      <Stack spacing={2} px={2} py={1.25}>
        {/* DashboardScreenSkeletonTitle — centered campaign title line */}
        <Grid2 container justifyContent="center">
          <Skeleton variant="text" width={200} height={32} />
        </Grid2>

        {/* DashboardScreenSkeletonSummary — 4× summary card */}
        <Grid2 container spacing={1.25}>
          {SUMMARY_PLACEHOLDERS.map((key) => (
            <Grid2 key={key} size={3}>
              <Skeleton variant="rounded" height={76} sx={{ borderRadius: "18px" }} />
            </Grid2>
          ))}
        </Grid2>

        {/* DashboardScreenSkeletonProgress — wide progress card */}
        <Stack pt={1} px={2} spacing={1.25}>
          <Skeleton variant="rounded" height={12} width={120} sx={{ borderRadius: "20px" }} />

          <Skeleton variant="rounded" height={12} sx={{ borderRadius: "20px" }} />
        </Stack>

        {/* DashboardScreenSkeletonOrders — header row + order cards */}
        <Stack spacing={1.25}>
          <Grid2 container alignItems="center" justifyContent="space-between" spacing={1}>
            <Skeleton variant="text" width={140} height={32} />
            <Skeleton variant="rounded" width={108} height={28} sx={{ borderRadius: "14px" }} />
          </Grid2>

          {ORDER_PLACEHOLDERS.map((key) => (
            <Skeleton key={key} variant="rounded" height={140} sx={{ borderRadius: "18px" }} />
          ))}
        </Stack>
      </Stack>
    </ScreenContainer>
  );
};

export default DashboardScreenSkeleton;
