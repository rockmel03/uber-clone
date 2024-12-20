import { useRef } from "react";
import { RideNotificationCard } from "./RideNotificationCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useSocket from "../../hooks/useSocket";

export const Notification = () => {
  const { notifications, setNotifications } = useSocket();

  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.from?.pathname || -1;

  const removeFromNotification = (id) => {
    setNotifications((prev) => {
      const filteredData = prev.filter((item) => {
        return item?.data?._id !== id;
      });

      return filteredData;
    });
  };

  const handleIgnore = (id) => {
    removeFromNotification(id);
  };
  const handleAccept = async (id) => {
    removeFromNotification(id);
    navigate(`/captain/rides/accept/${id}`, {
      from: { pathname: "/captain" },
      replace: true,
    });
  };

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
      className="fixed z-10 bg-white w-full max-h-screen min-h-[50vh] overflow-scroll"
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
      {notifications.length > 0 ? (
        notifications.map((item, idx) => (
          <RideNotificationCard
            key={idx}
            data={item?.data}
            handleAccept={() => handleAccept(item?.data?._id)}
            handleIgnore={() => handleIgnore(item?.data?._id)}
          />
        ))
      ) : (
        <p className="text-zinc-300 font-bold text-lg text-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          No new notifications
        </p>
      )}
    </section>
  );
};
