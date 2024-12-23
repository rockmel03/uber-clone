import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";
import useAuth from "../hooks/useAuth";
import { CaptainNav } from "../features/captain";
import { SideNav } from "./SideNav";
import { Link } from "react-router-dom";
import assets from "../assets";

export const NavigationPannel = ({ isOpen, setIsOpen }) => {
  const { auth } = useAuth();
  const navPannelRef = useRef(null);

  const tokenData = auth?.token ? jwtDecode(auth.token) : undefined;
  const roles = tokenData?.roles || [];

  const closeNavPannel = () => setIsOpen(false);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(navPannelRef.current, {
        left: "0",
        duration: 0.5,
      });
    } else {
      gsap.to(navPannelRef.current, {
        left: "-100%",
        duration: 0.5,
      });
    }
  }, [isOpen]);

  return (
    <aside
      ref={navPannelRef}
      className="fixed top-0 -left-full z-50 bg-white w-full h-screen overflow-y-scroll shadow-sm"
    >
      <button
        onClick={closeNavPannel}
        className="absolute  top-5 right-5 w-10 h-10 active:bg-zinc-200 duration-150 rounded-full grid place-items-center text-2xl font-semibold"
      >
        <i className="ri-close-line"></i>
      </button>
      <div>
      <div className="p-5">
        <div className="flex items-center justify-start gap-2">
          <div className="w-14 h-14 rounded-full bg-zinc-100 overflow-hidden border-4 border-black">
            <img
              src={assets.images.profilePlaceholder}
              alt="profile"
              className=" w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {auth?.fullname && Object.values(auth?.fullname).join(" ")}
            </h3>
            <Link
              to="/profile"
              className="bg-zinc-200 px-2 py-[1px] rounded-full text-xs font-semibold"
            >
              See Profile
            </Link>
          </div>
        </div>
        <br />
        <hr />
      </div>
        {roles.includes("captain") ? (
          <CaptainNav closeNavPannel={closeNavPannel} />
        ) : (
          roles.includes("user") && <SideNav closeNavPannel={closeNavPannel} />
        )}
      </div>
    </aside>
  );
};
