import { Routes, Route } from "react-router-dom";
import { Stack } from "@mui/material";
import Layout from "./components/layout";
import DefaultHeader from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={"<HomeScreen />"} />
        {/* <Route path="svh" element={<SvhScreen />} /> */}
      </Route>
    </Routes>
  );
};

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
      {/* <Nav top={`calc(${maxHeightUnit} / 2)`} /> */}
      <Stack className="silver" flex={0}>
        {/* HEADERS */}
        {header ?? <Header>{maxHeightUnit}</Header>}
      </Stack>

      <Stack
        flex={1}
        sx={{ height: "100%", overflowY: "auto", maxWidth: "100%" }}
        className="green"
      >
        {/* CONTENTS */}
        {children ?? content}
      </Stack>

      <Stack className="silver" flex={0}>
        {/* FOOTERS */}
        {footer ?? <Footer />}
      </Stack>
    </Stack>
  );
};

export { ScreenContainer, App };
export default App;
