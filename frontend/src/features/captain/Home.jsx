import { Outlet } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";

export const Home = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-end">
      <div className=" bg-white rounded-t-2xl shadow-[0px_0px_8px_#00000050]">
        <Dashboard />
      </div>
      <Outlet />
    </section>
  );
};
