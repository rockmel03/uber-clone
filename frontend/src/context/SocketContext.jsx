import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";

export const SocketContext = createContext();

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const SocketContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = io(baseUrl, {
    autoConnect: false,
  });

  useEffect(() => {
    socket.connect();

    socket.on("connection", (meassage) => {
      toast.success(meassage);
    });

    socket.on("message", (meassage) => {
      toast.info(meassage);
    });

    socket.on("disconnect", (reason, data) => {
      toast(reason + " : " + data.description);
    });

    // clean up
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("join", (data) => {
      console.log(data);
    });

    socket.on("new-ride", (data) => {
      toast.info("You have a new ride request", {
        data: data,
        autoClose: false,
        style: {
          backgroundColor: "orange",
        },
      });
      setNotifications((prev) => [...prev, { type: "new-ride", data }]);
    });
  }, []);
  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};
