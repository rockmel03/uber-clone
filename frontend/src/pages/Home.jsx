import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { auth } = useAuth();

  const decodedToken = auth?.token ? jwtDecode(auth.token) : undefined;
  const roles = decodedToken?.roles || undefined;

  return roles && roles.includes("captain") ? (
    <Navigate to="/captain" />
  ) : (
    <Navigate to="/ride" />
  );
};
