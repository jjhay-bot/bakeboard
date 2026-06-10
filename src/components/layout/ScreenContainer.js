import { Fade, Stack } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const ScreenContainer = ({
  vh = "100vh",
  children,
  header,
  footer,
  content,
  fade = true,
  fadeTimeout = 400,
  ...props
}) => {
  const supportsDvh = window.CSS && CSS.supports("(height: 100dvh)");
  const maxHeightUnit = supportsDvh ? vh : "100vh";

  return (
    <Stack className="layout" height={maxHeightUnit} {...props}>
      <Stack
        flex={0}
        //  className="silver"
      >
        {header ?? <Header />}
      </Stack>

      {/* Content fades in on mount so screen/skeleton swaps don't pop.
          Opt out per-screen with fade={false}. */}
      <Fade in appear={fade} timeout={fade ? fadeTimeout : 0} >
        <Stack
          flex={1}
          sx={{ height: "100%", overflowY: "auto", maxWidth: "100%" }}
          // className="green"
        >
          {children ?? content}
        </Stack>
      </Fade>

      <Stack className="silver" flex={0}>
        {footer ?? <Footer />}
      </Stack>
    </Stack>
  );
};

export default ScreenContainer;
