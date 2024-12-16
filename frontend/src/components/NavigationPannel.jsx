import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";
import useAuth from "../hooks/useAuth";
import { CaptainNav } from "../features/captain";

export const NavigationPannel = ({ isOpen, setIsOpen }) => {
  const { auth } = useAuth();
  const navPannelRef = useRef(null);

  const tokenData = auth?.token ? jwtDecode(auth.token) : undefined;
  const roles = tokenData?.roles || [];

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
    <section
      ref={navPannelRef}
      className="fixed top-0 -left-full z-50 bg-white w-full h-screen overflow-y-scroll shadow-sm"
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute  top-5 right-5 w-10 h-10 active:bg-zinc-200 duration-150 rounded-full grid place-items-center text-2xl font-semibold"
      >
        <i className="ri-close-line"></i>
      </button>
      <div>
        {roles.includes("captain") && (
          <CaptainNav closeNavPannel={() => setIsOpen(false)} />
        )}
      </div>
    </section>
  );
};
