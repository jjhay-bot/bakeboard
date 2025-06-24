import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Header = ({ children }) => {
  const [color, setColor] = useState("primary");

  const colorArray = ["primary", "secondary", "info", "success"];
  const vh = ["100svh", "100dvh", "100lvh", "100vh"];

  const getColorIndex = (val) => {
    const index = vh.indexOf(val);
    return index !== -1 ? index : 0;
  };

  useEffect(() => {
    setColor(colorArray[getColorIndex(children)]);
  }, [children]);

  return (
    <Stack p={1}>
      <Typography variant='caption'>Memory Jars</Typography>
      {/* <Button variant="outlined" color={color} sx={{ fontWeight: "bold", letterSpacing: "0.25px" }}>
        {children || "Header"}
      </Button> */}
    </Stack>
  );
};

export default Header;
