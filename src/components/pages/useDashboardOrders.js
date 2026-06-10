// useDashboardOrders — owns the dashboard's order data and the import/export/
// reset board actions, so DashboardScreen stays a thin view. All persistence
// goes through ordersService; user feedback goes through the snackbar.
import { useCallback, useEffect, useState } from "react";
import {
  clearOrders,
  exportOrders,
  importOrders,
  listOrders,
} from "../../services/orders/ordersService";
import { useSnackbar } from "../feedback/SnackbarProvider";

const useDashboardOrders = () => {
  const { showSnackbar } = useSnackbar();
  const [orders, setOrders] = useState([]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState("");

  const reload = useCallback(async () => {
    const nextOrders = await listOrders();
    setOrders(nextOrders);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const nextOrders = await listOrders();
        if (isMounted) {
          setOrders(nextOrders);
        }
      } catch (error) {
        console.error("Failed to load dashboard orders", error);
        if (isMounted) {
          showSnackbar({ type: "error", message: "Couldn't load today's orders." });
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [showSnackbar]);

  // Called after the Add Order dialog saves — refresh the list.
  const handleOrderSaved = async () => {
    try {
      await reload();
    } catch (error) {
      console.error("Failed to refresh dashboard orders", error);
      showSnackbar({
        type: "error",
        message: "Order saved, but the list couldn't refresh.",
      });
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportOrders();
      const payload = { exportedAt: new Date().toISOString(), orders: data };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = objectUrl;
      anchor.download = `orders-${new Date().toISOString()}.json`;
      anchor.click();
      URL.revokeObjectURL(objectUrl);

      showSnackbar({ type: "success", message: "Orders exported." });
    } catch (error) {
      console.error("Failed to export orders", error);
      showSnackbar({ type: "error", message: "Couldn't export orders." });
    }
  };

  const applyImport = async (payload) => {
    await importOrders(payload);
    await reload();
    setIsImportDialogOpen(false);
    setImportText("");
    showSnackbar({ type: "success", message: "Orders imported." });
  };

  const handleImportFile = async (file) => {
    try {
      const fileText = await file.text();
      await applyImport(JSON.parse(fileText));
    } catch (error) {
      console.error("Failed to import orders file", error);
      showSnackbar({
        type: "error",
        message: "Couldn't import that orders file.",
      });
    }
  };

  const handleImportTextSubmit = async (event) => {
    event.preventDefault();

    try {
      await applyImport(JSON.parse(importText));
    } catch (error) {
      console.error("Failed to import orders JSON", error);
      showSnackbar({
        type: "error",
        message: "Couldn't import that JSON. Check the format and try again.",
      });
    }
  };

  const handleReset = async () => {
    const shouldReset = window.confirm("Delete all saved orders?");
    if (!shouldReset) {
      return;
    }

    try {
      await clearOrders();
      await reload();
      showSnackbar({ type: "success", message: "Saved orders cleared." });
    } catch (error) {
      console.error("Failed to clear orders", error);
      showSnackbar({ type: "error", message: "Couldn't clear orders." });
    }
  };

  const openImportDialog = () => setIsImportDialogOpen(true);

  const closeImportDialog = () => {
    setIsImportDialogOpen(false);
    setImportText("");
  };

  const handleImportTextChange = (event) => setImportText(event.target.value);

  return {
    orders,
    isImportDialogOpen,
    importText,
    handleOrderSaved,
    handleExport,
    handleImportFile,
    handleImportTextSubmit,
    handleImportTextChange,
    handleReset,
    openImportDialog,
    closeImportDialog,
  };
};

export default useDashboardOrders;
