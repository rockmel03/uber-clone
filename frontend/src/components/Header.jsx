import { Link } from "react-router-dom";
import assets from "../assets";
import { useState } from "react";
import { NavigationPannel } from "./NavigationPannel";
import useSocket from "../hooks/useSocket";

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { notifications } = useSocket();

  return (
    <>
      <NavigationPannel isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-5 py-5">
        <div className="w-24">
          <img src={assets.images.logo} alt="logo" />
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/captain/notification"
            className="w-10 h-10 active:bg-zinc-200 duration-150 rounded-full grid place-items-center text-2xl font-semibold relative"
          >
            {notifications && notifications?.length > 0 && (
              <div className="absolute top-1 right-1 bg-red-500 p-[4px] rounded-full"></div>
            )}
            <i className="ri-notification-3-line"></i>
          </Link>
          <button
            onClick={() => setIsNavOpen(true)}
            className="w-10 h-10 active:bg-zinc-200 duration-150 rounded-full grid place-items-center text-2xl font-semibold"
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
      </header>
    </>
  );
};
