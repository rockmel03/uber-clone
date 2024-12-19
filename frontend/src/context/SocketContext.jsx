import { createContext, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const SocketContextProvider = ({ children }) => {
  const socket = io(baseUrl, {
    autoConnect: false,
  });

  useEffect(() => {
    socket.connect();

    socket.on("connection", (meassage) => {
      console.log("message : ", meassage);
    });

    socket.on("message", (meassage) => {
      console.log("message : ", meassage);
    });

    socket.on("disconnect", (reason, description) => {
      console.log("socket disconnected : ", reason, description);
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
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
