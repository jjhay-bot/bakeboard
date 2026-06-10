// SnackbarProvider — one app-level feedback channel. Mounted once near the root
// so any component can call useSnackbar().showSnackbar({ type, message }) and get
// consistently-styled MUI Alerts. Components trigger it; they never render their
// own toasts/alerts.
//
// Notifications STACK: several can be visible at once (newest at the bottom),
// and each auto-dismisses independently after its duration.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, Stack } from "@mui/material";

const SnackbarContext = createContext(null);

const DEFAULT_DURATION = 4000;

const SnackbarProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const keyRef = useRef(0);
  const timersRef = useRef(new Map());

  const dismiss = useCallback((key) => {
    setNotifications((list) => list.filter((item) => item.key !== key));

    const timer = timersRef.current.get(key);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(key);
    }
  }, []);

  // Stable so consumers of useSnackbar() don't re-render when a notification shows.
  const showSnackbar = useCallback(
    ({ type = "info", message, duration = DEFAULT_DURATION }) => {
      keyRef.current += 1;
      const key = keyRef.current;

      setNotifications((list) => [...list, { key, type, message }]);
      timersRef.current.set(
        key,
        setTimeout(() => dismiss(key), duration),
      );
    },
    [dismiss],
  );

  // Clear any pending timers if the provider unmounts.
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Stack
        spacing={1}
        sx={(theme) => ({
          position: "fixed",
          bottom: 16,
          left: 0,
          right: 0,
          px: 2,
          alignItems: "center",
          zIndex: theme.zIndex.snackbar,
          pointerEvents: "none", // let clicks pass through the gaps...
        })}
      >
        {notifications.map((item) => (
          <Alert
            key={item.key}
            severity={item.type}
            // variant="standard"
            onClose={() => dismiss(item.key)}
            sx={{
              pointerEvents: "auto", // ...but the alerts themselves stay clickable
              width: "100%",
              maxWidth: 420,
              boxShadow: 3,
            }}
          >
            {item.message}
          </Alert>
        ))}
      </Stack>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
};

export default SnackbarProvider;
