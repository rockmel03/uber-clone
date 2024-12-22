import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const DropDownPannel = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const pannelRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        pannelRef.current,
        {
          transform: `translate(0%, calc(100% - 30px)) `,
          duration: 0.5,
        },
        { transform: "translate(0%, 0%)", duration: 0.5 }
      );
    } else {
      gsap.to(pannelRef.current, {
        transform: "translate(0, calc(100% - 30px)",
        duration: 0.5,
      });
    }
  }, [isOpen]);

  return (
    <section
      ref={pannelRef}
      className="bg-white max-h-screen overflow-scroll w-full fixed z-10 pt-0 flex flex-col gap-2 shadow-[0_0_8px_#00000050] rounded-t-2xl"
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-[30px] grid place-items-center sticky z-10 top-0 shrink-0 bg-inherit"
      >
        <div className="w-1/4 h-1 bg-zinc-400 rounded-full" />
      </button>
      <div className="w-full">{children}</div>
    </section>
  );
};
