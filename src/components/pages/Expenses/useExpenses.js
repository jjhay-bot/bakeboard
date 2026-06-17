import { useEffect, useRef, useState } from "react";
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
import {
  getExpenseImage,
  removeExpenseImage,
  saveExpenseImage,
} from "./expensesImageStore";

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
  // Receipt image draft for the open form: the blob to persist on submit plus
  // an object URL for preview. The URL is tracked in a ref so we can revoke the
  // previous one whenever it changes (and on unmount) to avoid memory leaks.
  const [imageBlob, setImageBlob] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const previewUrlRef = useRef(null);

  const showPreview = (blob) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextUrl = blob ? URL.createObjectURL(blob) : null;
    previewUrlRef.current = nextUrl;
    setImagePreviewUrl(nextUrl);
  };

  const clearImageDraft = () => {
    setImageBlob(null);
    showPreview(null);
  };

  // Revoke any outstanding preview URL when the screen unmounts.
  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    [],
  );

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
    // Images are stored as blobs and never travel inside the JSON, so any
    // imported `hasImage` flag would dangle — drop it on import.
    setExpenses(
      normalizeExpenses(importedExpenses).map((expense) => ({
        ...expense,
        hasImage: false,
      })),
    );
    setIsDialogOpen(false);
    setEditingExpenseId(null);
    setFormValues(buildEmptyExpenseForm());
    clearImageDraft();
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
    // Clean up any stored receipt blobs so they don't orphan in localforage.
    expenses
      .filter((expense) => expense.hasImage)
      .forEach((expense) => removeExpenseImage(expense.id));
    setExpenses([]);
    setIsDialogOpen(false);
    setEditingExpenseId(null);
    setFormValues(buildEmptyExpenseForm());
    clearImageDraft();
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

  const handlePickImage = (file) => {
    if (!file) {
      return;
    }

    if (!file.type || !file.type.startsWith("image/")) {
      window.alert("Please choose an image file.");
      return;
    }

    setImageBlob(file);
    showPreview(file);
  };

  const handleRemoveImage = () => {
    clearImageDraft();
  };

  const handleOpenDialog = () => {
    setEditingExpenseId(null);
    setFormValues(buildEmptyExpenseForm());
    clearImageDraft();
    setIsDialogOpen(true);
  };

  const handleEditExpense = async (expense) => {
    setEditingExpenseId(expense.id);
    setFormValues(buildExpenseFormValues(expense));
    clearImageDraft();
    setIsDialogOpen(true);

    // Lazy-load the stored receipt so editing keeps it unless the user removes it.
    if (expense.hasImage) {
      const storedBlob = await getExpenseImage(expense.id);

      if (storedBlob) {
        setImageBlob(storedBlob);
        showPreview(storedBlob);
      }
    }
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

    if (targetExpense.hasImage) {
      removeExpenseImage(targetExpense.id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExpenseId(null);
    setFormValues(buildEmptyExpenseForm());
    clearImageDraft();
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

    const targetId = editingExpenseId || `expense-${Date.now()}`;
    const nextHasImage = Boolean(imageBlob);

    // Persist the receipt blob (or drop it) under its own key. Fire-and-forget:
    // the blob lives outside the expenses array, so it isn't part of this save.
    if (imageBlob) {
      saveExpenseImage(targetId, imageBlob);
    } else {
      removeExpenseImage(targetId);
    }

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
                  hasImage: nextHasImage,
                }
              : expense,
          ),
        ),
      );
      handleCloseDialog();
      return;
    }

    const createdExpense = {
      id: targetId,
      date: nextDate,
      amount: numericAmount,
      category: formValues.category,
      paymentChannel: formValues.paymentChannel,
      note: trimmedNote,
      hasImage: nextHasImage,
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
    imagePreviewUrl,
    handleOpenSummary,
    handleCloseSummary,
    handleSummaryMonthShift,
    handlePickImage,
    handleRemoveImage,
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
