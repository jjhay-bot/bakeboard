import { Stack } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const ScreenContainer = ({
  vh = "100vh",
  children,
  header,
  footer,
  content,
  ...props
}) => {
  const supportsDvh = window.CSS && CSS.supports("(height: 100dvh)");
  const maxHeightUnit = supportsDvh ? vh : "100vh";

  return (
    <Stack className="layout" height={maxHeightUnit} {...props}>
      <Stack className="silver" flex={0}>
        {header ?? <Header />}
      </Stack>

      <Stack
        flex={1}
        sx={{ height: "100%", overflowY: "auto", maxWidth: "100%" }}
        // className="green"
      >
        {children ?? content}
      </Stack>

      <Stack className="silver" flex={0}>
        {footer ?? <Footer />}
      </Stack>
    </Stack>
  );
};

export default ScreenContainer;
