import { Outlet } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import { useEffect } from "react";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";

export const Home = () => {
  const { socket } = useSocket();
  const { auth } = useAuth();

  const updateLocation = (userId) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("update-location", userId, {
          ltd: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    if (!auth.token) return;

    const { userId, roles } = auth;
    if (userId && roles) {
      socket.emit("join", { userId, roles });
    }

    updateLocation(userId);
    const interval = setInterval(() => {
      console.log("updating location....");
      updateLocation(userId);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [auth]);

  return (
    <section className="w-full h-screen flex flex-col justify-end">
      <div className=" bg-white rounded-t-2xl shadow-[0px_0px_8px_#00000050]">
        <Dashboard />
      </div>
      <Outlet />
    </section>
  );
};
