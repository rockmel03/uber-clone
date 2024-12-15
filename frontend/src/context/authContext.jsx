import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [auth, setAuth] = useState({
    token: token,
  });

  useEffect(() => {
    if (auth.token) setToken(auth?.token);
  }, [auth?.token]);
  
  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};
