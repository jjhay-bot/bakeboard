import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

const DashboardOrderCard = ({ order, tone }) => {
  const {
    background,
    border,
    nameColor,
    detailColor,
    metaColor,
    badgeBackground,
    badgeColor,
  } = tone;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: "18px",
        bgcolor: background,
        border: `1px solid ${border}`,
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="stretch">
        {order.imageUrl ? (
          <Box
            component="img"
            src={order.imageUrl}
            alt={order.product}
            sx={{
              width: 100,
              height: 100,
              flexShrink: 0,
              objectFit: "cover",
              borderRadius: "16px",
              border: `1px solid ${border}`,
            }}
          />
        ) : null}

        <Stack spacing={0.25} width="100%" minWidth={0}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
          >
            <Stack spacing={0.25} minWidth={0}>
              <Typography
                color={nameColor}
                fontSize={18}
                fontWeight={700}
                sx={{ letterSpacing: 0 }}
              >
                {order.customerName}
              </Typography>
              <Typography color={detailColor} fontSize={14} fontWeight={600}>
                {order.product}
              </Typography>
            </Stack>

            <Chip
              label={order.paymentStatus}
              size="small"
              sx={{
                height: 28,
                bgcolor: badgeBackground,
                color: badgeColor,
                fontWeight: 700,
                borderRadius: "999px",
                "& .MuiChip-label": {
                  px: 1.25,
                  fontSize:
                    order?.paymentStatus?.length > 10 ? "0.72rem" : "0.8rem",
                  letterSpacing:
                    order?.paymentStatus?.length > 10 ? "-0.75px" : "normal",
                },
              }}
            />
          </Stack>

          <Stack spacing={0.25}>
            <Typography color={detailColor} fontSize={13} fontWeight={500}>
              {order.flavor}
            </Typography>
            <Typography color={detailColor} fontSize={13} fontWeight={500}>
              {order.theme}
            </Typography>
            <Typography color={metaColor} fontSize={13} fontWeight={600}>
              {order.pickupText}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DashboardOrderCard;
