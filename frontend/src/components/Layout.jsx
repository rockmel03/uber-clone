import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <main className="bg-zinc-900 text-white w-full min-h-screen">
      <Outlet />
    </main>
  );
};
