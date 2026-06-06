// export const invoicesList = [
//   {
//     "invoice_number": "12340",
//     "amount": 1250,
//   },
//   {
//     "invoice_number": "12345",
//     "amount": 1250,
//   },
//   {
//     "invoice_number": "12349",
//     "amount": 1250,
//   },
//   {
//     "invoice_number": "12366",
//     "amount": 1250,
//   },
//   {
//     "invoice_number": "12374",
//     "amount": 1250,
//   },
// ];

// export const reasonList = [
//   {
//     "reason": "Delivery Returns",
//   },
//   {
//     "reason": "Discounts",
//   },
//   {
//     "reason": "Split Mode of Payment",
//   },
//   {
//     "reason": "Promos",
//   },
// ];

export const defaultDashboardCampaign = {
  id: "mothers-day-2025",
  label: "Seasonal Event",
  title: "Mother's Day Orders 🌸",
  dateText: "May 10, 2025",
  summary: "Track this campaign's orders, payment progress, and slot usage in one place.",
};

export const dashboardSummaryTones = {
  total: {
    background: "#fff1ef",
    border: "#f6d4ce",
    valueColor: "#7d3c31",
    labelColor: "#9b5c4e",
  },
  paid: {
    background: "#eef8e7",
    border: "#d8e9c9",
    valueColor: "#4f7b37",
    labelColor: "#5f8750",
  },
  downpayment: {
    background: "#fff5e8",
    border: "#f2dfbf",
    valueColor: "#b56a25",
    labelColor: "#a36b37",
  },
  unpaid: {
    background: "#fff0f2",
    border: "#f4d2d9",
    valueColor: "#d24d63",
    labelColor: "#b65b68",
  },
};

export const defaultDashboardSummary = [
  {
    id: "total",
    label: "Total",
    value: 15,
    tone: dashboardSummaryTones.total,
  },
  {
    id: "paid",
    label: "Paid",
    value: 8,
    tone: dashboardSummaryTones.paid,
  },
  {
    id: "downpayment",
    label: "Downpayment",
    value: 4,
    tone: dashboardSummaryTones.downpayment,
  },
  {
    id: "unpaid",
    label: "Unpaid",
    value: 3,
    tone: dashboardSummaryTones.unpaid,
  },
];

export const dashboardProgressTone = {
  background: "#fffaf2",
  border: "#f1dfc7",
  titleColor: "#8a5640",
  valueColor: "#6e3f2f",
  helperColor: "#9d775f",
  trackColor: "#f3e4d4",
  barColor: "#88b56a",
};

export const defaultDashboardProgress = {
  id: "todays-progress",
  title: "Today's Progress",
  totalOrders: 15,
  completedOrders: 8,
  helperText: "8 baked or finished today, 7 remaining.",
  tone: dashboardProgressTone,
};

export const dashboardOrderTones = {
  paid: {
    background: "#fffdfb",
    border: "#f1ddd2",
    nameColor: "#6e3f2f",
    detailColor: "#8a5640",
    metaColor: "#a07460",
    badgeBackground: "#eef8e7",
    badgeColor: "#4f7b37",
  },
  downpayment: {
    background: "#fffdfb",
    border: "#f1ddd2",
    nameColor: "#6e3f2f",
    detailColor: "#8a5640",
    metaColor: "#a07460",
    badgeBackground: "#fff5e8",
    badgeColor: "#b56a25",
  },
  unpaid: {
    background: "#fffdfb",
    border: "#f1ddd2",
    nameColor: "#6e3f2f",
    detailColor: "#8a5640",
    metaColor: "#a07460",
    badgeBackground: "#fff0f2",
    badgeColor: "#d24d63",
  },
};

export const defaultDashboardOrdersToday = {
  title: "Orders Today",
  items: [
    {
      id: "ana-santos",
      customerName: "Ana Santos",
      product: "Bento Cake",
      flavor: "Chocolate",
      theme: "Pink & Cream",
      pickupText: "May 10, 9:00 AM",
      paymentStatus: "Paid",
      imageUrl:
        "https://images.unsplash.com/photo-1557308536-ee471ef2c390?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.paid,
    },
    {
      id: "mark-reyes",
      customerName: "Mark Reyes",
      product: "Cupcake Box",
      flavor: "Vanilla",
      theme: "Purple",
      pickupText: "May 10, 2:00 PM",
      paymentStatus: "Unpaid",
      imageUrl:
        "https://images.unsplash.com/photo-1587536848939-c7e58de4b792?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.unpaid,
    },
    {
      id: "claire-dela-cruz",
      customerName: "Claire Dela Cruz",
      product: "Mini Cake",
      flavor: "Strawberry",
      theme: "Blush Floral",
      pickupText: "May 10, 4:30 PM",
      paymentStatus: "Downpayment",
      imageUrl:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.downpayment,
    },
    {
      id: "jessa-lim",
      customerName: "Jessa Lim",
      product: "Chocolate Cake",
      flavor: "Dark Chocolate",
      theme: "Minimal Gold",
      pickupText: "May 10, 6:00 PM",
      paymentStatus: "Paid",
      imageUrl:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.paid,
    },
    {
      id: "paolo-garcia",
      customerName: "Paolo Garcia",
      product: "Cookie Box",
      flavor: "Chocolate Chip",
      theme: "Brown Kraft",
      pickupText: "May 10, 7:15 PM",
      paymentStatus: "Unpaid",
      imageUrl:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.unpaid,
    },
  ],
};
