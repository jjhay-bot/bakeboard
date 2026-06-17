export const expensesStorageKey = "expenses";

export const defaultPaymentChannel = "ub-creditcard";

export const expenseCategoryOptions = [
  { value: "meralco", label: "Meralco" },
  { value: "manila-water", label: "Manila Water" },
  { value: "bida", label: "Bida Fiber" },
  { value: "shopee", label: "Shopee" },
  { value: "netflix", label: "Netflix" },
  { value: "insular", label: "Insular" },
  { value: "claude", label: "Claude" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "youtube", label: "YouTube" },
  { value: "crunchyroll", label: "Crunchyroll" },
  { value: "wigo", label: "Wigo" },
  { value: "savemore-cc", label: "SaveMore-CC" },
  { value: "Faye-allowance", label: "Faye Allowance" },
  { value: "hazel-allowance", label: "Hazel Allowance" },
  { value: "jomar-allowance", label: "Jomar Allowance" },
  { value: "mama-allowance", label: "Mama Allowance" },
  { value: "pantoc-students", label: "Pantoc Students" },
  { value: "sunlife", label: "Sunlife" },
  { value: "github", label: "GitHub" },
  { value: "smart-load", label: "Smart Load Immortal" },
  { value: "canva", label: "Canva" },
];

export const expensePaymentChannelOptions = [
  { value: "ub-creditcard", label: "UB Credit Card" },
  { value: "cash", label: "Cash" },
  { value: "gcash", label: "GCash" },
  { value: "maya", label: "Maya" },
  { value: "bank-transfer", label: "Bank Transfer" },
];

const categoryLabelByValue = new Map(
  expenseCategoryOptions.map((option) => [option.value, option.label]),
);

const channelLabelByValue = new Map(
  expensePaymentChannelOptions.map((option) => [option.value, option.label]),
);

export const getCategoryLabel = (value) =>
  categoryLabelByValue.get(value) || value || "Uncategorized";

export const getPaymentChannelLabel = (value) => channelLabelByValue.get(value) || value || "—";

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPeso = (amount) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return pesoFormatter.format(0);
  }

  return pesoFormatter.format(numericAmount);
};

// Date helpers — kept here so the form and persistence agree on the format.
// Stored as a YYYY-MM-DD string (matches a native <input type="date"> value).
export const getTodayDateInput = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatExpenseDate = (dateInput) => {
  if (!dateInput) {
    return "No date";
  }

  // Parse the stored YYYY-MM-DD as a local date (avoid UTC shifting the day).
  const [year, month, day] = dateInput.split("-").map(Number);
  const parsed = new Date(year, (month || 1) - 1, day || 1);

  if (Number.isNaN(parsed.getTime())) {
    return "No date";
  }

  return parsed.toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Month helpers — work on the "YYYY-MM" prefix of the stored date string.
export const getCurrentMonthInput = () => getTodayDateInput().slice(0, 7);

export const getExpenseMonth = (expense) => (expense.date || "").slice(0, 7);

export const formatMonthLabel = (monthInput) => {
  if (!monthInput) {
    return "All time";
  }

  const [year, month] = monthInput.split("-").map(Number);
  const parsed = new Date(year, (month || 1) - 1, 1);

  if (Number.isNaN(parsed.getTime())) {
    return monthInput;
  }

  return parsed.toLocaleDateString("en-PH", { month: "long", year: "numeric" });
};

// Shift a "YYYY-MM" month by N months (negative = earlier).
export const shiftMonth = (monthInput, offset) => {
  const [year, month] = monthInput.split("-").map(Number);
  const base = new Date(year, (month || 1) - 1 + offset, 1);
  const nextYear = base.getFullYear();
  const nextMonth = `${base.getMonth() + 1}`.padStart(2, "0");

  return `${nextYear}-${nextMonth}`;
};

export const filterExpensesByMonth = (expenses, monthInput) =>
  expenses.filter((expense) => getExpenseMonth(expense) === monthInput);

// Per-category totals for a set of expenses, largest spend first.
export const summarizeByCategory = (expenses) => {
  const totalsByCategory = new Map();

  expenses.forEach((expense) => {
    const amount = Number(expense.amount);

    if (!Number.isFinite(amount)) {
      return;
    }

    totalsByCategory.set(
      expense.category,
      (totalsByCategory.get(expense.category) || 0) + amount,
    );
  });

  return [...totalsByCategory.entries()]
    .map(([category, total]) => ({
      category,
      label: getCategoryLabel(category),
      total,
    }))
    .sort((a, b) => b.total - a.total);
};

export const buildEmptyExpenseForm = () => ({
  date: getTodayDateInput(),
  amount: "",
  category: expenseCategoryOptions[0].value,
  paymentChannel: defaultPaymentChannel,
  note: "",
});

export const buildExpenseFormValues = (expense) => ({
  date: expense.date || getTodayDateInput(),
  amount: expense.amount === null || expense.amount === undefined ? "" : `${expense.amount}`,
  category: expense.category || expenseCategoryOptions[0].value,
  paymentChannel: expense.paymentChannel || defaultPaymentChannel,
  note: expense.note || "",
});

export const getExpensesTotal = (expenses) =>
  expenses.reduce((total, expense) => {
    const numericAmount = Number(expense.amount);

    return Number.isFinite(numericAmount) ? total + numericAmount : total;
  }, 0);

// Newest entry first; fall back to a stable order when dates tie.
export const sortExpenses = (expenses) =>
  [...expenses].sort((a, b) => {
    const dateCompare = (b.date || "").localeCompare(a.date || "");

    return dateCompare !== 0 ? dateCompare : (b.id || "").localeCompare(a.id || "");
  });

export const normalizeExpenses = (expenses) => {
  if (!Array.isArray(expenses)) {
    return initialExpenses;
  }

  const cleaned = expenses
    .filter(
      (expense) =>
        expense &&
        typeof expense === "object" &&
        typeof expense.id === "string" &&
        Number.isFinite(Number(expense.amount)),
    )
    .map((expense) => ({
      id: expense.id,
      date: typeof expense.date === "string" ? expense.date : getTodayDateInput(),
      amount: Number(expense.amount),
      category:
        typeof expense.category === "string" ? expense.category : expenseCategoryOptions[0].value,
      paymentChannel:
        typeof expense.paymentChannel === "string" ? expense.paymentChannel : defaultPaymentChannel,
      note: typeof expense.note === "string" ? expense.note : "",
      hasImage: expense.hasImage === true,
    }));

  return sortExpenses(cleaned);
};

export const extractExpenseImportItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object" && Array.isArray(payload.expenses)) {
    return payload.expenses;
  }

  return null;
};

export const initialExpenses = normalizeExpenses([
  {
    id: "expense-seed-1",
    date: getTodayDateInput(),
    amount: 2500,
    category: "our-allowance",
    paymentChannel: "cash",
    note: "Weekly allowance",
  },
  {
    id: "expense-seed-2",
    date: getTodayDateInput(),
    amount: 549,
    category: "netflix",
    paymentChannel: "ub-creditcard",
    note: "Monthly subscription",
  },
  {
    id: "expense-seed-3",
    date: getTodayDateInput(),
    amount: 1200,
    category: "meralco",
    paymentChannel: "gcash",
    note: "",
  },
]);
