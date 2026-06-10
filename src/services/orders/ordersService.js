// ordersService — orchestration the UI calls. Combines the transport
// (ordersApi) with the rules/shaping (orderModel). Screens and forms import
// from here; they never touch ordersApi or storage directly.
import { defaultDashboardOrdersToday } from "../../assets/data";
import { fetchStoredOrders, persistStoredOrders } from "./ordersApi";
import {
  buildOrderRecord,
  extractImportedOrders,
  normalizeStoredOrders,
} from "./orderModel";

// Read the saved orders, seeding the built-in samples the first time only.
// A missing key (null) means "never seeded" → seed the demos. An empty array
// means the user cleared everything → stays empty (samples do NOT come back).
const readOrders = async () => {
  const stored = await fetchStoredOrders();

  if (stored === null) {
    const seeded = normalizeStoredOrders(defaultDashboardOrdersToday.items);
    await persistStoredOrders(seeded);
    return seeded;
  }

  return normalizeStoredOrders(stored);
};

export const listOrders = async () => readOrders();

export const createOrder = async (draft) => {
  const nextOrder = buildOrderRecord(draft);
  const currentOrders = await readOrders();
  const nextOrders = [nextOrder, ...currentOrders];

  await persistStoredOrders(nextOrders);

  return nextOrder;
};

// Snapshot of everything currently shown, for the JSON export download.
export const exportOrders = async () => listOrders();

// Merge imported orders on top of the saved ones. Throws on a malformed
// payload so the caller can surface an error.
export const importOrders = async (payload) => {
  const incoming = extractImportedOrders(payload);

  if (incoming === null) {
    throw new Error("Invalid orders JSON format");
  }

  const importedOrders = normalizeStoredOrders(incoming);
  const currentOrders = await readOrders();
  const nextOrders = [...importedOrders, ...currentOrders];

  await persistStoredOrders(nextOrders);

  return nextOrders;
};

// Clear all orders → the board goes empty and stays empty (the samples are not
// re-seeded, since storage is now [] rather than missing).
export const clearOrders = async () => {
  await persistStoredOrders([]);
};
