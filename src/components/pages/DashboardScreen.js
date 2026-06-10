import { useMemo, useState } from "react";
import { Button, Grid2, keyframes, Paper, Stack, Typography } from "@mui/material";
import {
  defaultDashboardCampaign,
  defaultDashboardProgress,
  dashboardSummaryTones,
} from "../../assets/data";
import AddOrderDialog from "./AddOrder/AddOrderDialog";
import {
  DataToolbar,
  ImportDialog,
  DashboardOrderCard,
  DashboardProgressCard,
  DashboardSummaryCard,
} from "../molecules";
import ScreenContainer from "../layout/ScreenContainer";
import { PAYMENT_STATUS } from "../../services/orders/orderModel";
import useDashboardOrders from "./useDashboardOrders";
import DashboardScreenSkeleton from "./DashboardScreenSkeleton";

// Replayed on each filter change (via the keyed wrapper) so the order list
// fades in instead of snapping when the active summary card changes.
const orderListFadeIn = keyframes`
  from { opacity: 0; transform: translateX(6px); }
  to { opacity: 1; transform: translateX(0); }
`;

const buildSummaryCards = (orders) => {
  const paidCount = orders.filter((order) => order.paymentStatus === PAYMENT_STATUS.PAID).length;
  const downpaymentCount = orders.filter(
    (order) => order.paymentStatus === PAYMENT_STATUS.DOWNPAYMENT,
  ).length;
  const unpaidCount = orders.filter(
    (order) => order.paymentStatus === PAYMENT_STATUS.UNPAID,
  ).length;

  return [
    {
      id: "total",
      label: "Total",
      value: orders.length,
      filterValue: "all",
      tone: dashboardSummaryTones.total,
    },
    {
      id: "paid",
      label: "Paid",
      value: paidCount,
      filterValue: PAYMENT_STATUS.PAID,
      tone: dashboardSummaryTones.paid,
    },
    {
      id: "downpayment",
      label: "Downpayment",
      value: downpaymentCount,
      filterValue: PAYMENT_STATUS.DOWNPAYMENT,
      tone: dashboardSummaryTones.downpayment,
    },
    {
      id: "unpaid",
      label: "Unpaid",
      value: unpaidCount,
      filterValue: PAYMENT_STATUS.UNPAID,
      tone: dashboardSummaryTones.unpaid,
    },
  ];
};

const buildProgress = (orders) => {
  const completedOrders = orders.filter(
    (order) => order.paymentStatus === PAYMENT_STATUS.PAID,
  ).length;
  const totalOrders = orders.length;
  const remainingOrders = Math.max(totalOrders - completedOrders, 0);

  return {
    ...defaultDashboardProgress,
    totalOrders,
    completedOrders,
    helperText: `${completedOrders} paid or confirmed today, ${remainingOrders} remaining.`,
  };
};

const DashboardScreen = () => {
  const {
    orders,
    isLoading,
    isImportDialogOpen,
    importText,
    handleOrderSaved,
    handleExport,
    handleImportFile,
    handleImportTextSubmit,
    handleImportTextChange,
    handleReset,
    openImportDialog,
    closeImportDialog,
  } = useDashboardOrders();
  const [campaign] = useState(defaultDashboardCampaign);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  const summaryCards = useMemo(() => buildSummaryCards(orders), [orders]);
  const dailyProgress = useMemo(() => buildProgress(orders), [orders]);
  const progressValue =
    dailyProgress.totalOrders > 0
      ? (dailyProgress.completedOrders / dailyProgress.totalOrders) * 100
      : 0;
  const filteredOrders =
    selectedFilter === "all"
      ? orders
      : orders.filter((order) => order.paymentStatus === selectedFilter);

  const handleAddOrderSaved = () => {
    setIsAddOrderOpen(false);
    handleOrderSaved();
  };

  // Full-screen swap: skeleton stands in until the first load resolves. Placed
  // after all hooks so the early return doesn't violate the rules of hooks.
  if (isLoading) {
    return <DashboardScreenSkeleton />;
  }

  return (
    <ScreenContainer sx={{ bgcolor: "#fffaf6" }}>
      <Stack spacing={2} px={2} py={1.25}>
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

        <Grid2 justifyContent={campaign.title ? "center" : "flex-end"} container>
          {campaign.title ? (
            <Typography
              color="primary.main"
              // color="#6e3f2f"
              fontSize={22}
              fontWeight={600}
              sx={{
                transform: "translateY(0.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {campaign.title}
            </Typography>
          ) : (
            <Typography color="#8a5640" fontSize={14} fontWeight={600}>
              {campaign.dateText}
            </Typography>
          )}
        </Grid2>

        {/* DISABLED FEATURE - NOT IN USE, BUT KEEPING FOR FUTURE REFERENCE */}
        <Paper
          className="disabled_feature"
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "20px",
            bgcolor: "#fff6f0",
            border: "1px solid #f4ddd1",
          }}
        >
          <Stack spacing={-0.25}>
            <Typography color="primary.main" fontSize={12} fontWeight={700}>
              {campaign.label}
            </Typography>

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
                active={selectedFilter === item.filterValue}
                onClick={() => setSelectedFilter(item.filterValue)}
              />
            </Grid2>
          ))}
        </Grid2>

        <DashboardProgressCard
          title={dailyProgress.title}
          valueText={`${dailyProgress.completedOrders} / ${dailyProgress.totalOrders}`}
          progress={progressValue}
          progressLabel={dailyProgress.progressLabel}
          helperText={dailyProgress.helperText}
          tone={dailyProgress.tone}
        />

        <Stack spacing={1.25}>
          <Grid2 container alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography color="#6e3f2f" fontSize={22} fontWeight={700}>
              Orders Today
            </Typography>

            <Button
              onClick={() => setIsAddOrderOpen(true)}
              size="small"
              sx={{
                borderRadius: "14px",
                bgcolor: "#fff0f4",
                color: "primary.main",
                boxShadow: "0 6px 14px rgba(255, 127, 143, 0.20)",
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

          <Stack
            key={selectedFilter}
            spacing={1.25}
            sx={{ animation: `${orderListFadeIn} 1000ms ease-out` }}
          >
            {filteredOrders.map((order) => (
              <DashboardOrderCard key={order.id} order={order} tone={order.tone} />
            ))}
          </Stack>
        </Stack>

        <DataToolbar
          title="Order actions"
          importLabel="Import orders"
          downloadLabel="Export orders as JSON"
          resetLabel="Delete all saved orders"
          onImport={openImportDialog}
          onDownload={handleExport}
          onReset={handleReset}
        />
      </Stack>

      <AddOrderDialog
        open={isAddOrderOpen}
        onClose={() => setIsAddOrderOpen(false)}
        onSaveSuccess={handleAddOrderSaved}
      />
      <ImportDialog
        open={isImportDialogOpen}
        title="Import orders"
        description="Upload an exported orders file or paste the JSON to merge it in."
        fieldLabel="Orders JSON"
        importText={importText}
        onChangeText={handleImportTextChange}
        onClose={closeImportDialog}
        onImportFile={handleImportFile}
        onSubmit={handleImportTextSubmit}
      />
    </ScreenContainer>
  );
};

export default DashboardScreen;
