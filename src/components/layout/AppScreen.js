import { Slide, Grid, Stack } from "@mui/material";
import { forwardRef } from "react";

export const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppScreen = ({ children, sx, onSubmit, bgcolor = "#fff" }) => {
  return (
    <Grid
      container
      justifyContent="center"
      component="form"
      onSubmit={onSubmit}
    >
      <Grid
        item
        sx={{
          maxWidth: 425,
          width: "100%",
          ...sx,
          border: { custom: "1px dashed #e2e3ed" },
        }}
        className="app"
      >
        <Stack alignItems="space-around" sx={{ bgcolor, height: "100%" }}>
          {children}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AppScreen;
