import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  filterExpensesByMonth,
  formatMonthLabel,
  formatPeso,
  getExpensesTotal,
  summarizeByCategory,
} from "./expensesData";

const ExpensesMonthSummaryDialog = ({
  open,
  month,
  expenses,
  onClose,
  onShiftMonth,
}) => {
  const monthExpenses = filterExpensesByMonth(expenses, month);
  const monthTotal = getExpensesTotal(monthExpenses);
  const categoryBreakdown = summarizeByCategory(monthExpenses);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 1 }}>
        <Stack spacing={0.5}>
          <Typography color="secondary.main" fontSize={24} fontWeight={700}>
            Monthly summary
          </Typography>
          <Typography color="#8a6a5c" fontSize={14}>
            Total spending per month, broken down by category.
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: "8px !important" }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconButton
              aria-label="Previous month"
              onClick={() => onShiftMonth(-1)}
              sx={{ color: "secondary.main" }}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <Typography color="secondary.main" fontSize={16} fontWeight={700}>
              {formatMonthLabel(month)}
            </Typography>
            <IconButton
              aria-label="Next month"
              onClick={() => onShiftMonth(1)}
              sx={{ color: "secondary.main" }}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Stack>

          <Stack spacing={0.25} alignItems="center">
            <Typography color="#9a7a6a" fontSize={13} fontWeight={700}>
              Total spent
            </Typography>
            <Typography color="secondary.main" fontSize={32} fontWeight={700}>
              {formatPeso(monthTotal)}
            </Typography>
            <Typography color="#9a7a6a" fontSize={13}>
              {monthExpenses.length}{" "}
              {monthExpenses.length === 1 ? "entry" : "entries"}
            </Typography>
          </Stack>

          <Divider />

          {categoryBreakdown.length > 0 ? (
            <Stack spacing={1}>
              <Typography color="secondary.main" fontSize={14} fontWeight={700}>
                By category
              </Typography>
              {categoryBreakdown.map((item) => (
                <Stack
                  key={item.category}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1.5}
                >
                  <Typography color="#6f5a4f" fontSize={14}>
                    {item.label}
                  </Typography>
                  <Typography
                    color="secondary.main"
                    fontSize={14}
                    fontWeight={700}
                    whiteSpace="nowrap"
                  >
                    {formatPeso(item.total)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ) : (
            <Typography color="#9a7a6a" fontSize={14} textAlign="center">
              No expenses logged for this month.
            </Typography>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ExpensesMonthSummaryDialog;
