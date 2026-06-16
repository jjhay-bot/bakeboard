import { useEffect, useState } from "react";
import { getForage, setForage } from "../../../utils/forage";
import {
  buildEmptyExpenseForm,
  buildExpenseFormValues,
  extractExpenseImportItems,
  expensesStorageKey,
  getCurrentMonthInput,
  initialExpenses,
  normalizeExpenses,
  shiftMonth,
  sortExpenses,
} from "./expensesData";

const useExpenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(buildEmptyExpenseForm);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPersistenceEnabled, setIsPersistenceEnabled] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summaryMonth, setSummaryMonth] = useState(getCurrentMonthInput);

  useEffect(() => {
    let isMounted = true;

    const loadExpenses = async () => {
      try {
        // API-ready note:
        // If a backend expenses endpoint is introduced later, move this read
        // behind a dedicated service module and replace the localforage call
        // there, e.g. listExpenses -> GET /expenses.
        const storedExpenses = await getForage(expensesStorageKey);

        if (!isMounted) {
          return;
        }

        if (storedExpenses !== null) {
          setExpenses(normalizeExpenses(storedExpenses));
          setIsPersistenceEnabled(true);
        }
      } catch (error) {
        console.error("Failed to load expenses", error);
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    };

    loadExpenses();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated || !isPersistenceEnabled) {
      return;
    }

    const persistExpenses = async () => {
      try {
        // API-ready note:
        // Replace this local persistence call through a service boundary when
        // backend CRUD is ready, e.g. saveExpenses -> PUT/POST endpoint.
        await setForage(expensesStorageKey, expenses);
      } catch (error) {
        console.error("Failed to save expenses", error);
      }
    };

    persistExpenses();
  }, [isHydrated, isPersistenceEnabled, expenses]);

  const handleDownloadExpenses = () => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      expenses,
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = objectUrl;
    anchor.download = `expenses-${new Date().toISOString()}.json`;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  };

  const replaceExpensesFromImport = (payload) => {
    const importedExpenses = extractExpenseImportItems(payload);

    if (importedExpenses === null) {
      throw new Error("Invalid expenses JSON format");
    }

    setIsPersistenceEnabled(true);
    setExpenses(normalizeExpenses(importedExpenses));
    setIsDialogOpen(false);
    setEditingExpenseId(null);
    setFormValues(buildEmptyExpenseForm());
    setIsImportDialogOpen(false);
    setImportText("");
  };

  const handleOpenImportDialog = () => {
    setIsImportDialogOpen(true);
  };

  const handleCloseImportDialog = () => {
    setIsImportDialogOpen(false);
    setImportText("");
  };

  const handleImportTextChange = (event) => {
    setImportText(event.target.value);
  };

  const handleImportTextSubmit = (event) => {
    event.preventDefault();

    try {
      replaceExpensesFromImport(JSON.parse(importText));
    } catch (error) {
      window.alert(
        "Could not import expenses JSON. Check the format and try again.",
      );
    }
  };

  const handleImportFile = async (file) => {
    if (!file) {
      return;
    }

    try {
      const fileText = await file.text();
      replaceExpensesFromImport(JSON.parse(fileText));
    } catch (error) {
      window.alert("Could not import expenses JSON file.");
    }
  };

  const handleResetExpenses = () => {
    const shouldReset = window.confirm("Delete all current expenses?");

    if (!shouldReset) {
      return;
    }

    setIsPersistenceEnabled(true);
    setExpenses([]);
    setIsDialogOpen(false);
    setEditingExpenseId(null);
    setFormValues(buildEmptyExpenseForm());
  };

  const handleOpenSummary = () => {
    // Always reopen on the current month so it reflects "now" by default.
    setSummaryMonth(getCurrentMonthInput());
    setIsSummaryOpen(true);
  };

  const handleCloseSummary = () => {
    setIsSummaryOpen(false);
  };

  const handleSummaryMonthShift = (offset) => {
    setSummaryMonth((current) => shiftMonth(current, offset));
  };

  const handleOpenDialog = () => {
    setEditingExpenseId(null);
    setFormValues(buildEmptyExpenseForm());
    setIsDialogOpen(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpenseId(expense.id);
    setFormValues(buildExpenseFormValues(expense));
    setIsDialogOpen(true);
  };

  const handleDeleteExpense = (targetExpense) => {
    const shouldDelete = window.confirm("Delete this expense?");

    if (!shouldDelete) {
      return;
    }

    setIsPersistenceEnabled(true);
    setExpenses((current) =>
      current.filter((expense) => expense.id !== targetExpense.id),
    );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExpenseId(null);
    setFormValues(buildEmptyExpenseForm());
  };

  const handleChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSelectField = (field, value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const numericAmount = Number(formValues.amount);
    const trimmedNote = formValues.note.trim();
    const nextDate = formValues.date || buildEmptyExpenseForm().date;

    // Amount is the only hard requirement; guard against blank/zero/invalid.
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return;
    }

    setIsPersistenceEnabled(true);

    if (editingExpenseId) {
      setExpenses((current) =>
        sortExpenses(
          current.map((expense) =>
            expense.id === editingExpenseId
              ? {
                  ...expense,
                  date: nextDate,
                  amount: numericAmount,
                  category: formValues.category,
                  paymentChannel: formValues.paymentChannel,
                  note: trimmedNote,
                }
              : expense,
          ),
        ),
      );
      handleCloseDialog();
      return;
    }

    const createdExpense = {
      id: `expense-${Date.now()}`,
      date: nextDate,
      amount: numericAmount,
      category: formValues.category,
      paymentChannel: formValues.paymentChannel,
      note: trimmedNote,
    };

    setExpenses((current) => sortExpenses([createdExpense, ...current]));
    handleCloseDialog();
  };

  return {
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
  };
};

export default useExpenses;
