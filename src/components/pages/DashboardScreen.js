import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  defaultDashboardCampaign,
  defaultDashboardOrdersToday,
  defaultDashboardProgress,
  defaultDashboardSummary,
} from "../../assets/data";
import {
  DashboardOrderCard,
  DashboardProgressCard,
  DashboardSummaryCard,
} from "../molecules";
import ScreenContainer from "../layout/ScreenContainer";

const DashboardScreen = () => {
  const [campaign] = useState(defaultDashboardCampaign);
  const [ordersToday] = useState(defaultDashboardOrdersToday);
  const [dailyProgress] = useState(defaultDashboardProgress);
  const [summaryCards] = useState(defaultDashboardSummary);
  const navigate = useNavigate();
  const progressValue =
    dailyProgress.totalOrders > 0
      ? (dailyProgress.completedOrders / dailyProgress.totalOrders) * 100
      : 0;

  return (
    <ScreenContainer sx={{ bgcolor: "#fffaf6" }}>
      <Stack spacing={2} px={2} py={2.5}>
        {/* <Stack spacing={0.25}>
          <Grid2
            container
            alignItems="center"
            spacing={1}
            justifyContent="space-between"
          >
            <Typography color="#8a5640" fontSize={14} fontWeight={600}>
              {campaign.dateText}
            </Typography>

            <Typography color="secondary.main" fontSize={12} fontWeight={700}>
              Dashboard
            </Typography>
          </Grid2>
        </Stack> */}

        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "20px",
            bgcolor: "#fff6f0",
            border: "1px solid #f4ddd1",
          }}
        >
          <Stack spacing={-0.25}>
            {/* <Typography color="primary.main" fontSize={12} fontWeight={700}>
              {campaign.label}
            </Typography> */}

            <Typography
              color="primary.main"
              // color="#6e3f2f"
              fontSize={22}
              fontWeight={700}
            >
              {campaign.title}
            </Typography>

            <Typography color="#8a5640" fontSize={14} fontWeight={600}>
              {campaign.dateText}
            </Typography>
          </Stack>
        </Paper>

        <Grid2 container spacing={1.25}>
          {summaryCards.map((item) => (
            <Grid2 key={item.id} size={3}>
              <DashboardSummaryCard
                value={item.value}
                label={item.label}
                tone={item.tone}
              />
            </Grid2>
          ))}
        </Grid2>

        <DashboardProgressCard
          title={dailyProgress.title}
          valueText={`${dailyProgress.completedOrders} / ${dailyProgress.totalOrders}`}
          progress={progressValue}
          helperText={dailyProgress.helperText}
          tone={dailyProgress.tone}
        />

        <Stack spacing={1.25}>
          <Grid2
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography color="#6e3f2f" fontSize={22} fontWeight={700}>
              {ordersToday.title}
            </Typography>

            <Button
              onClick={() => navigate("/orders/new")}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: "999px",
                bgcolor: "#fff0f4",
                color: "primary.main",
                boxShadow: "0 6px 14px rgba(255, 127, 143, 0.16)",
                fontSize: 14,
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#ffe7ee",
                  boxShadow: "0 8px 18px rgba(255, 127, 143, 0.22)",
                },
              }}
            >
              + Add Order
            </Button>
          </Grid2>

          {ordersToday.items.map((order) => (
            <DashboardOrderCard key={order.id} order={order} tone={order.tone} />
          ))}
        </Stack>
      </Stack>
    </ScreenContainer>
  );
};

export default DashboardScreen;
