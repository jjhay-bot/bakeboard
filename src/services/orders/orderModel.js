// orderModel — pure order rules, reference data, and record shaping.
// No I/O and no React: just "what an order is" and how to derive its fields.
// Shared by the form (preview), the service (persistence), and the screens.
import { format, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { dashboardOrderTones } from "../../assets/data";

// The 3 status strings as constants (kills the scattered magic strings).
export const PAYMENT_STATUS = {
  PAID: "Paid",
  DOWNPAYMENT: "Downpayment",
  UNPAID: "Unpaid",
};

// Single product catalog: value + display label + price. Everything else
// (option lists, price/label lookups) is derived from this so product data
// lives in exactly one place. Mirrors the likely GET /products response shape.
export const PRODUCTS = [
  {
    value: "bento-cake",
    label: "Bento Cake",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1557308536-ee471ef2c390?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "mini-cake",
    label: "Mini Cake",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "cupcake-box",
    label: "Cupcake Box",
    price: 780,
    image:
      "https://images.unsplash.com/photo-1587536848939-c7e58de4b792?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "cookie-box",
    label: "Cookie Box",
    price: 680,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    value: "number-cake",
    label: "Number Cake",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const productByValue = PRODUCTS.reduce((acc, product) => {
  acc[product.value] = product;
  return acc;
}, {});

export const getProductPrice = (value) => productByValue[value]?.price ?? null;

export const getProductLabel = (value) =>
  productByValue[value]?.label ?? "Custom Order";

export const getProductImage = (value) => productByValue[value]?.image ?? null;

const flavorLabelMap = {
  chocolate: "Chocolate",
  vanilla: "Vanilla",
  "red-velvet": "Red Velvet",
  ube: "Ube",
  strawberry: "Strawberry",
};

const pickupSlotTimeMap = {
  morning: "9:00 AM",
  afternoon: "2:00 PM",
  evening: "6:00 PM",
};

const paymentToneMap = {
  [PAYMENT_STATUS.PAID]: dashboardOrderTones.paid,
  [PAYMENT_STATUS.DOWNPAYMENT]: dashboardOrderTones.downpayment,
  [PAYMENT_STATUS.UNPAID]: dashboardOrderTones.unpaid,
};

const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

// Coerce raw form input to a positive number, else null.
export const normalizePaymentAmount = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return null;
  }

  return numericValue;
};

// The single payment-status derivation:
// no amount -> Unpaid, amount >= product price -> Paid, otherwise Downpayment.
export const getPaymentStatus = (product, amount) => {
  const paymentAmount = normalizePaymentAmount(amount);
  const productPrice = getProductPrice(product);

  if (!paymentAmount) {
    return PAYMENT_STATUS.UNPAID;
  }

  if (Number.isFinite(productPrice) && paymentAmount >= productPrice) {
    return PAYMENT_STATUS.PAID;
  }

  return PAYMENT_STATUS.DOWNPAYMENT;
};

// PHP currency formatting. Returns "" for non-positive/invalid input.
export const formatPaymentAmount = (value) => {
  const paymentAmount = normalizePaymentAmount(value);

  if (!paymentAmount) {
    return "";
  }

  return currencyFormatter.format(paymentAmount);
};

const formatPickupText = (pickupDate, pickupSlot) => {
  if (!pickupDate) {
    return "Pickup date pending";
  }

  const parsedDate = parseISO(pickupDate);
  const slotLabel = pickupSlotTimeMap[pickupSlot] || "TBD";

  if (Number.isNaN(parsedDate.getTime())) {
    return `${pickupDate} • ${slotLabel}`;
  }

  return `${format(parsedDate, "MMM d")} • ${slotLabel}`;
};

// Defensively keep only well-formed order records read from storage/API.
export const normalizeStoredOrders = (orders) => {
  if (!Array.isArray(orders)) {
    return [];
  }

  return orders.filter(
    (order) =>
      order &&
      typeof order === "object" &&
      typeof order.id === "string" &&
      typeof order.customerName === "string" &&
      typeof order.product === "string" &&
      typeof order.paymentStatus === "string",
  );
};

// Pull the orders array out of an imported payload, whether it's a bare array
// or an export envelope ({ exportedAt, orders }). Returns null if neither shape
// is present so the caller can reject the import.
export const extractImportedOrders = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.orders)) {
    return payload.orders;
  }

  return null;
};

// Shape a raw form draft into a persisted order record.
export const buildOrderRecord = (draft) => {
  const paymentStatus = getPaymentStatus(draft.product, draft.paymentAmount);
  const paymentAmount = normalizePaymentAmount(draft.paymentAmount);

  return {
    id: uuidv4(),
    customerName: draft.customerName.trim(),
    product: getProductLabel(draft.product),
    flavor: flavorLabelMap[draft.flavor] || "Custom Flavor",
    theme: draft.themeNotes.trim() || "Custom theme",
    pickupText: formatPickupText(draft.pickupDate, draft.pickupSlot),
    paymentStatus,
    paymentAmount,
    imageUrl: getProductImage(draft.product),
    tone: paymentToneMap[paymentStatus] || dashboardOrderTones.downpayment,
  };
};
