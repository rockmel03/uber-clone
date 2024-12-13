import { useEffect } from "react";
import api from "../api/axios";
import useAuth from "./useAuth";
export const useApiPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((req) => {
      if (!req.headers["Authorization"]) {
        req.headers["Authorization"] = `Bearer ${auth?.token}`;
      }
      return req;
    });

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [auth?.token]);

  return api;
};
