// ordersApi — transport layer. The ONLY place that talks to storage/network.
// Today it reads/writes localforage; when the backend is ready, swap these two
// functions for apiClient calls (GET/POST /orders) and nothing else changes.
import { getForage, setForage } from "../../utils/forage";

const customOrdersStorageKey = "dashboard-custom-orders";

// Raw read of persisted orders. Later: const { data } = await apiClient.get("/orders");
export const fetchStoredOrders = async () => getForage(customOrdersStorageKey);

// Raw write of persisted orders. Later: await apiClient.post("/orders", orders);
export const persistStoredOrders = async (orders) =>
  setForage(customOrdersStorageKey, orders);
