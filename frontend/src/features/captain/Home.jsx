import { Outlet } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import { useEffect } from "react";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

export const Home = () => {
  const { socket } = useSocket();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.token) return;

    const { userId, roles } = auth;
    if (userId && roles) {
      socket.emit("join", { userId, roles });
    }

    // update the location in after 5 seconds
    if (!navigator?.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    const lastLocationUpdatedAt = 0;

    const watchId = navigator?.geolocation?.watchPosition(
      (position) => {
        const now = Date.now();
        // Throttle to 1 update every 5 seconds
        if (now - lastLocationUpdatedAt > 5000) {
          socket.emit("update-location", userId, {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Location access denied by user.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location unavailable.");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out.");
            break;
          default:
            toast.error("An unknown error occurred.");
            break;
        }
      },
      {
        enableHighAccuracy: true, // Ensure GPS is used for precise location updates
        timeout: 10000, // Allow up to 10 seconds for fetching a location
        maximumAge: 5000, // Accept cached data up to 5 seconds old
      }
    );

    return () => {
      navigator?.geolocation?.clearWatch(watchId);
    };
  }, [auth, socket]);

  return (
    <section className="w-full h-screen flex flex-col justify-end">
      <div className=" bg-white rounded-t-2xl shadow-[0px_0px_8px_#00000050]">
        <Dashboard />
      </div>
      <Outlet />
    </section>
  );
};
