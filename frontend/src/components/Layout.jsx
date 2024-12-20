import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  return (
    <div className="w-full min-h-screen">
      <ToastContainer />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
