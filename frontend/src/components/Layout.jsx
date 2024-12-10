import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="p-5 w-full min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
