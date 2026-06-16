import {
  AddOrderScreen,
  CalendarScreen,
  DashboardScreen,
  ExpensesScreen,
  MoodboardScreen,
  OrderDetailScreen,
  PaymentsScreen,
} from "../../components/pages";

export const appRoutes = [
  {
    index: true,
    element: DashboardScreen,
  },
  {
    path: "home",
    element: DashboardScreen,
  },
  {
    path: "dashboard",
    element: DashboardScreen,
  },
  {
    path: "orders",
    element: DashboardScreen,
  },
  {
    path: "orders/new",
    element: AddOrderScreen,
  },
  {
    path: "orders/:orderId",
    element: OrderDetailScreen,
  },
  {
    path: "calendar",
    element: CalendarScreen,
  },
  {
    path: "payments",
    element: PaymentsScreen,
  },
  {
    path: "expenses",
    element: ExpensesScreen,
  },
  {
    path: "moodboard",
    element: MoodboardScreen,
  },
];
