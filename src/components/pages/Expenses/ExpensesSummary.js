import { Paper, Stack, Typography } from "@mui/material";
import { formatPeso } from "./expensesData";

const ExpensesSummary = ({ total, count }) => {
  return (
    <Paper
      variant="boardPanel"
      elevation={0}
      sx={{ p: 2, py: 1.25 }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1.5}
      >
        <Stack spacing={0.25}>
          <Typography
            color="#9a7a6a"
            fontSize={13}
            fontWeight={700}
          >
            Total spent
          </Typography>
          <Typography
            color="secondary.main"
            fontSize={26}
            fontWeight={700}
          >
            {formatPeso(total)}
          </Typography>
        </Stack>

        <Stack
          spacing={0.25}
          alignItems="flex-end"
        >
          <Typography
            color="#9a7a6a"
            fontSize={13}
            fontWeight={700}
          >
            Entries
          </Typography>
          <Typography
            color="secondary.main"
            fontSize={26}
            fontWeight={700}
          >
            {count}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ExpensesSummary;
