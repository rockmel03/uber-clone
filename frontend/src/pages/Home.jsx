// import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const Home = () => {
  // const { auth } = useAuth();

  return <Navigate to="/ride" />;
};
