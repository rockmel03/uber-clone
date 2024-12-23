import { useEffect } from "react";
import api from "../api/axios";
import useAuth from "./useAuth";
export const useApiPrivate = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (req) => {
        if (!req.headers["Authorization"]) {
          req.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return req;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        // const req = error.config;
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          setAuth({});
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth?.token]);

  return api;
};
