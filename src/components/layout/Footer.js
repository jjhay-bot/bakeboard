import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
// import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  // {
  //   label: "Dashboard",
  //   value: "/dashboard",
  //   matchPaths: ["/", "/home", "/dashboard"],
  //   icon: <DashboardRoundedIcon />,
  // },
  {
    label: "Orders",
    value: "/orders",
    matchPaths: ["/orders", "/orders/new"],
    icon: <ReceiptLongRoundedIcon />,
  },
  {
    label: "Calendar",
    value: "/calendar",
    matchPaths: ["/calendar"],
    icon: <CalendarMonthRoundedIcon />,
  },
  {
    label: "Payments",
    value: "/payments",
    matchPaths: ["/payments"],
    icon: <PaymentsRoundedIcon />,
  },
  {
    label: "Moodboard",
    value: "/moodboard",
    matchPaths: ["/moodboard"],
    icon: <LightbulbRoundedIcon />,
  },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeValue = useMemo(() => {
    const pathname = location.pathname;
    const matchedItem = navItems.find((item) =>
      item.matchPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))
    );

    if (matchedItem) {
      return matchedItem.value;
    }

    if (pathname.startsWith("/orders/")) {
      return "/orders";
    }

    return "/dashboard";
  }, [location.pathname]);

  return (
    <Paper
      elevation={0}
      sx={{
        borderTop: "1px solid #f1ddd2",
        bgcolor: "#fffaf6",
        position: "sticky",
        bottom: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={activeValue}
        onChange={(_, nextValue) => navigate(nextValue)}
        sx={{
          bgcolor: "transparent",
          height: 72,
          maxWidth: 400,
          mx: "auto",
          "& .MuiBottomNavigationAction-root": {
            color: "#9a7a6a",
            minWidth: "auto",
            maxWidth: "none",
          },
          "& .Mui-selected": {
            color: "#ed5a29",
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: 12,
            fontWeight: 600,
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
