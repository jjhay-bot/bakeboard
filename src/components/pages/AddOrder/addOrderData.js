import {
  addDays,
  format,
  isValid,
  nextSaturday,
  nextSunday,
  parseISO,
} from "date-fns";

export const emptyAddOrderForm = {
  customerName: "",
  pickupDate: "",
  themeNotes: "",
  product: "bento-cake",
  flavor: "chocolate",
  paymentStatus: "downpayment",
  pickupSlot: "morning",
};

export const addOrderProductOptions = [
  { value: "bento-cake", label: "Bento Cake" },
  { value: "mini-cake", label: "Mini Cake" },
  { value: "cupcake-box", label: "Cupcake Box" },
  { value: "cookie-box", label: "Cookie Box" },
  { value: "number-cake", label: "Number Cake" },
];

export const addOrderFlavorOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "vanilla", label: "Vanilla" },
  { value: "red-velvet", label: "Red Velvet" },
  { value: "ube", label: "Ube" },
  { value: "strawberry", label: "Strawberry" },
];

export const addOrderPaymentOptions = [
  { value: "paid", label: "Paid" },
  { value: "downpayment", label: "Downpayment" },
  { value: "unpaid", label: "Unpaid" },
];

export const addOrderPickupSlotOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];

export const addOrderValueLabelMap = {
  "bento-cake": "Bento Cake",
  "mini-cake": "Mini Cake",
  "cupcake-box": "Cupcake Box",
  "cookie-box": "Cookie Box",
  "number-cake": "Number Cake",
  chocolate: "Chocolate",
  vanilla: "Vanilla",
  "red-velvet": "Red Velvet",
  ube: "Ube",
  strawberry: "Strawberry",
  paid: "Paid",
  downpayment: "Downpayment",
  unpaid: "Unpaid",
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

const toInputDate = (date) => format(date, "yyyy-MM-dd");

export const getAddOrderQuickDateOptions = () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const twoDaysLater = addDays(today, 2);
  const saturday = nextSaturday(today);
  const sunday = nextSunday(today);
  const todayValue = toInputDate(today);
  const tomorrowValue = toInputDate(tomorrow);
  const saturdayValue = toInputDate(saturday);
  const sundayValue = toInputDate(sunday);

  let thirdOptionDate = saturday;

  if (saturdayValue === todayValue || saturdayValue === tomorrowValue) {
    thirdOptionDate =
      sundayValue === todayValue || sundayValue === tomorrowValue
        ? twoDaysLater
        : sunday;
  }

  return [
    { value: toInputDate(today), label: "Today" },
    { value: toInputDate(tomorrow), label: "Tomorrow" },
    {
      value: toInputDate(thirdOptionDate),
      label: format(thirdOptionDate, "eeee"),
    },
  ];
};

export const formatAddOrderPickupDate = (pickupDate) => {
  if (!pickupDate) {
    return "Pick a date";
  }

  const parsedDate = parseISO(pickupDate);

  if (!isValid(parsedDate)) {
    return pickupDate;
  }

  return format(parsedDate, "MMM d, yyyy");
};
