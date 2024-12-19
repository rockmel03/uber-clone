import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { jwtDecode } from "jwt-decode";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [auth, setAuth] = useState({
    token: token,
  });

  useEffect(() => {
    if (!auth.token) return;

    setToken(auth?.token);
    const decodedToken = jwtDecode(auth?.token);
    if (decodedToken) {
      setAuth((prev) => {
        const { _id: userId, ...rest } = decodedToken;
        return { ...prev, userId, ...rest };
      });
    }
  }, [auth?.token]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};
