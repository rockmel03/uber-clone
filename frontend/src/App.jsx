import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./features/auth/Login";
import Home from "./pages/Home";
import { RequireAuth } from "./features/auth/RequireAuth";
import { Register } from "./features/auth/Register";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
