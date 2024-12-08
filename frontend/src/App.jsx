import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./features/auth/Login";
import Home from "./pages/Home";
import { RequireAuth } from "./features/auth/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
