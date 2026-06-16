import { useRef } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import ScreenContainer from "../../layout/ScreenContainer";
import ExpensesExpenseDialog from "./ExpensesExpenseDialog";
import ExpensesExpenseRow from "./ExpensesExpenseRow";
import ExpensesImportDialog from "./ExpensesImportDialog";
import ExpensesMonthSummaryDialog from "./ExpensesMonthSummaryDialog";
import ExpensesSummary from "./ExpensesSummary";
import {
  expenseCategoryOptions,
  expensePaymentChannelOptions,
  getExpensesTotal,
} from "./expensesData";
import useExpenses from "./useExpenses";

const ExpensesScreen = () => {
  const importInputRef = useRef(null);
  const {
    expenses,
    isDialogOpen,
    isImportDialogOpen,
    isSummaryOpen,
    summaryMonth,
    formValues,
    editingExpenseId,
    importText,
    handleOpenSummary,
    handleCloseSummary,
    handleSummaryMonthShift,
    handleOpenDialog,
    handleDownloadExpenses,
    handleEditExpense,
    handleDeleteExpense,
    handleOpenImportDialog,
    handleCloseImportDialog,
    handleImportFile,
    handleImportTextChange,
    handleImportTextSubmit,
    handleResetExpenses,
    handleCloseDialog,
    handleChange,
    handleSelectField,
    handleSubmit,
  } = useExpenses();

  const handleOpenImportFilePicker = () => {
    importInputRef.current?.click();
  };

  const handleImportInputChange = async (event) => {
    const [file] = event.target.files || [];

    await handleImportFile(file);
    event.target.value = "";
  };

  return (
    <ScreenContainer sx={{ bgcolor: "#fffaf6" }}>
      <Stack
        spacing={2}
        px={2}
        py={2}
      >
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Typography
              color="#8a5640"
              fontSize={12}
              fontWeight={700}
            >
              Track spend
            </Typography>
            <Typography
              color="secondary.main"
              fontSize={28}
              fontWeight={700}
            >
              Expenses
            </Typography>
            <Typography
              color="#7f655b"
              fontSize={14}
            >
              A quick log for personal spending — allowances, bills, and subscriptions in one place.
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
          >
            <IconButton
              onClick={handleOpenSummary}
              aria-label="View monthly summary"
              size="small"
              sx={{
                borderRadius: "14px",
                bgcolor: "#fff6f0",
                color: "secondary.main",
                border: "1px solid #f2d7ca",
                "&:hover": {
                  bgcolor: "#ffece3",
                },
              }}
            >
              <AssessmentRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              onClick={handleOpenDialog}
              aria-label="Add new expense"
              variant="boardAction"
              size="small"
            >
              <AddRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Stack>

        <ExpensesSummary
          total={getExpensesTotal(expenses)}
          count={expenses.length}
        />

        {expenses.length > 0 ? (
          <Stack spacing={1.5}>
            {expenses.map((expense) => (
              <ExpensesExpenseRow
                key={expense.id}
                expense={expense}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
              />
            ))}
          </Stack>
        ) : (
          <Paper
            variant="boardPanel"
            elevation={0}
            sx={{ p: 2 }}
          >
            <Stack spacing={0.5}>
              <Typography
                color="secondary.main"
                fontSize={16}
                fontWeight={700}
              >
                No expenses yet
              </Typography>
              <Typography
                color="#9a7a6a"
                fontSize={14}
              >
                Tap the plus button to log your first expense.
              </Typography>
            </Stack>
          </Paper>
        )}

        <Paper
          variant="boardPanel"
          elevation={0}
          sx={{ p: 2 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              color="secondary.main"
              fontSize={16}
              fontWeight={700}
            >
              List actions
            </Typography>

            <Stack
              direction="row"
              spacing={1}
            >
              <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleImportInputChange}
                hidden
              />
              <IconButton
                aria-label="Import expenses"
                onClick={handleOpenImportDialog}
                sx={{
                  borderRadius: "14px",
                  bgcolor: "#fff6f0",
                  color: "secondary.main",
                  border: "1px solid #f2d7ca",
                  "&:hover": {
                    bgcolor: "#ffece3",
                  },
                }}
              >
                <FileUploadRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                aria-label="Download expenses as JSON"
                onClick={handleDownloadExpenses}
                sx={{
                  borderRadius: "14px",
                  bgcolor: "#fff6f0",
                  color: "secondary.main",
                  border: "1px solid #f2d7ca",
                  "&:hover": {
                    bgcolor: "#ffece3",
                  },
                }}
              >
                <FileDownloadRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton
                aria-label="Delete all expenses"
                onClick={handleResetExpenses}
                sx={{
                  borderRadius: "14px",
                  bgcolor: "#fff6f0",
                  color: "#c85027",
                  border: "1px solid #f2d7ca",
                  "&:hover": {
                    bgcolor: "#ffece3",
                  },
                }}
              >
                <RestartAltRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <ExpensesExpenseDialog
        open={isDialogOpen}
        formValues={formValues}
        isEditing={Boolean(editingExpenseId)}
        onClose={handleCloseDialog}
        onChange={handleChange}
        onSelectField={handleSelectField}
        onSubmit={handleSubmit}
        categoryOptions={expenseCategoryOptions}
        paymentChannelOptions={expensePaymentChannelOptions}
      />
      <ExpensesImportDialog
        open={isImportDialogOpen}
        importText={importText}
        onChange={handleImportTextChange}
        onClose={handleCloseImportDialog}
        onChooseFile={handleOpenImportFilePicker}
        onSubmit={handleImportTextSubmit}
      />
      <ExpensesMonthSummaryDialog
        open={isSummaryOpen}
        month={summaryMonth}
        expenses={expenses}
        onClose={handleCloseSummary}
        onShiftMonth={handleSummaryMonthShift}
      />
    </ScreenContainer>
  );
};

export default ExpensesScreen;
