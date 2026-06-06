import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import { appRoutes } from "./configs/routers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {appRoutes.map(({ element: Page, index, path }) => (
          <Route
            key={path ?? "index"}
            index={index}
            path={path}
            element={<Page />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export { App };
export default App;
