import {
  AddOrderScreen,
  CalendarScreen,
  DashboardScreen,
  MoodboardScreen,
  OrderDetailScreen,
  OrdersScreen,
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
    element: OrdersScreen,
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
    path: "moodboard",
    element: MoodboardScreen,
  },
];
