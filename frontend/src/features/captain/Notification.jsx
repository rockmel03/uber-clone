import { useRef, useState } from "react";
import { RideNotificationCard } from "./RideNotificationCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Notification = () => {
  const [notifications, setNotifications] = useState([1, 2, 4, 5, 6]);

  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.from?.pathname || -1;

  const handleIgnore = () => {};
  const handleAccept = () => {};

  const handleGoBack = () => {
    navigate(from);
  };

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      {
        transform: "translate(0%,100%)",
        duration: 0.5,
      },
      {
        transform: "translate(0%,0%)",
        duration: 0.5,
      }
    );
  });

  return (
    <section
      ref={containerRef}
      className="fixed z-10 bg-white w-full max-h-screen overflow-scroll"
    >
      <div className="py-5 flex items-center justify-center sticky z-[1] w-full top-0 bg-white shadow-sm">
        <button
          onClick={handleGoBack}
          className="absolute left-2 w-10 h-10 rounded-full hover:bg-zinc-100 active:bg-zinc-100 active:scale-90 cursor-pointer"
        >
          <span className="text-2xl">
            <i className="ri-arrow-left-line"></i>
          </span>
        </button>

        <h2 className="text-2xl font-semibold text-center">Notifications</h2>
      </div>
      {notifications.length > 0 &&
        notifications.map((item, idx) => (
          <RideNotificationCard
            key={idx}
            handleAccept={handleAccept}
            handleIgnore={handleIgnore}
          />
        ))}
    </section>
  );
};
