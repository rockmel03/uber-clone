import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const PannelContainer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const pannleRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(pannleRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
      });
    } else {
      gsap.to(pannleRef.current, {
        transform: "translateY(90%)",
        duration: 0.5,
      });
    }
  }, [isOpen]);
  return (
    <div
      ref={pannleRef}
      className="w-full fixed z-10 translate-y-[90%] bg-white shadow-[0_0_12px_#00000050] rounded-t-xl"
    >
      <button onClick={() => setIsOpen((prev) => !prev)} className="w-full">
        <span className=" text-3xl text-gray-300">
          {isOpen ? (
            <i className="ri-arrow-down-wide-fill"></i>
          ) : (
            <i className="ri-arrow-up-wide-fill"></i>
          )}
        </span>
      </button>
      {children}
    </div>
  );
};
