import { Badge, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BellIcon, CakeIcon } from "../../assets/icons";

const title = "BakeBoard";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={2}
      py={1}
      sx={{
        bgcolor: "#fffaf6",
        borderBottom: "2px solid #f4e3d7",
        boxShadow: "0 1px 4px rgba(237, 122, 72, 0.18)",
      }}
    >
      <Stack
        component="button"
        alignItems="center"
        justifyContent="center"
        onClick={() => navigate("/dashboard")}
        sx={{
          width: 32,
          height: 32,
          p: 0.5,
          appearance: "none",
          borderRadius: "14px",
          bgcolor: "#fff7f1",
          border: "0.75px solid #f4d9c788",
          boxShadow: "0 8px 18px rgba(237, 122, 72, 0.18)",
          cursor: "pointer",
          transition: "transform 120ms ease, box-shadow 120ms ease",
          "&:hover": {
            boxShadow: "0 10px 20px rgba(237, 122, 72, 0.22)",
          },
          "&:active": {
            transform: "translateY(1px)",
          },
        }}
        aria-label="Go to dashboard"
      >
        <CakeIcon sx={{ width: 32, height: 32 }} />
      </Stack>

      <Stack>
        <Typography
          sx={{
            color: "#6e3f2f",
            fontSize: 36,
            lineHeight: 1,
            letterSpacing: 2,
            fontWeight: 600,
            // pt: 0.75,
            transform: "translateY(0.35rem)",
          }}
          className="alex_brush"
        >
          {title}
        </Typography>
      </Stack>

      <IconButton
        aria-label="Notifications"
        sx={{
          width: 40,
          height: 40,
          borderRadius: "14px",
          color: "#7a5644",
          bgcolor: "#fff6f0",
          border: "1px solid #f4e3d7",
          p: 0.25,
        }}
      >
        <Badge
          badgeContent={1}
          color="error"
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              top: 4,
              right: 2,
              minWidth: 16,
              height: 16,
              padding: "0 4px",
              fontSize: 10,
              fontWeight: 700,
              bgcolor: "#ff6b81",
              color: "#ffffff",
            },
          }}
        >
          <BellIcon sx={{ width: 26, height: 26 }} />
        </Badge>
      </IconButton>
    </Stack>
  );
};

export default Header;
