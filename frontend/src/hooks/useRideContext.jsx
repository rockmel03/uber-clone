import { useContext } from "react";
import rideContext from "../context/rideContext";

const useRideContext = () => {
  return useContext(rideContext);
};

export default useRideContext;
