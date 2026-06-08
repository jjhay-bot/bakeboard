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
    value: 12,
    filterValue: "all",
    tone: dashboardSummaryTones.total,
  },
  {
    id: "paid",
    label: "Paid",
    value: 5,
    filterValue: "Paid",
    tone: dashboardSummaryTones.paid,
  },
  {
    id: "downpayment",
    label: "Downpayment",
    value: 4,
    filterValue: "Downpayment",
    tone: dashboardSummaryTones.downpayment,
  },
  {
    id: "unpaid",
    label: "Unpaid",
    value: 3,
    filterValue: "Unpaid",
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
  totalOrders: 12,
  completedOrders: 7,
  progressLabel: "Baking...",
  helperText: "7 baked or finished today, 5 remaining.",
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
    {
      id: "mia-navarro",
      customerName: "Mia Navarro",
      product: "Number Cake",
      flavor: "Ube",
      theme: "Pastel Lilac",
      pickupText: "May 10, 8:00 AM",
      paymentStatus: "Paid",
      imageUrl:
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.paid,
    },
    {
      id: "niko-fernandez",
      customerName: "Niko Fernandez",
      product: "Bento Set",
      flavor: "Red Velvet",
      theme: "Blue Clouds",
      pickupText: "May 10, 10:30 AM",
      paymentStatus: "Downpayment",
      imageUrl:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.downpayment,
    },
    {
      id: "bianca-tan",
      customerName: "Bianca Tan",
      product: "Dedication Cake",
      flavor: "Mocha",
      theme: "Vintage Heart",
      pickupText: "May 10, 11:45 AM",
      paymentStatus: "Paid",
      imageUrl:
        "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.paid,
    },
    {
      id: "enzo-morales",
      customerName: "Enzo Morales",
      product: "Cupcake Tower",
      flavor: "Cookies & Cream",
      theme: "Sage Green",
      pickupText: "May 10, 1:15 PM",
      paymentStatus: "Unpaid",
      imageUrl:
        "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.unpaid,
    },
    {
      id: "trisha-ramos",
      customerName: "Trisha Ramos",
      product: "Mini Donut Box",
      flavor: "Strawberry Milk",
      theme: "Peach Bows",
      pickupText: "May 10, 3:00 PM",
      paymentStatus: "Downpayment",
      imageUrl:
        "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.downpayment,
    },
    {
      id: "carlo-bautista",
      customerName: "Carlo Bautista",
      product: "Photo Cake",
      flavor: "Vanilla Bean",
      theme: "Black & White",
      pickupText: "May 10, 5:15 PM",
      paymentStatus: "Downpayment",
      imageUrl:
        "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.downpayment,
    },
    {
      id: "ella-velasco",
      customerName: "Ella Velasco",
      product: "Brownie Slab",
      flavor: "Triple Chocolate",
      theme: "Minimal Beige",
      pickupText: "May 10, 8:30 PM",
      paymentStatus: "Paid",
      imageUrl:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tone: dashboardOrderTones.paid,
    },
  ],
};
