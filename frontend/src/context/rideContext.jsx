import { createContext, useEffect, useReducer, useState } from "react";
import { useApiPrivate } from "../hooks/useApiPrivate";

export const rideContext = createContext({});

export const RideActionTypes = {
  SET_PICKUP: "SET_PICKUP",
  SET_DESTINATION: "SET_DESTINATION",
  SET_VEHICLE_TYPE: "SET_VEHICLE_TYPE",
  SET_FARE: "SET_FARE",
  RESET: "RESET",
};

const initialState = {
  pickup: null,
  destination: null,
  vehicleType: "",
  fare: null,
};

const rideReducer = (state, action) => {
  switch (action.type) {
    case RideActionTypes.SET_PICKUP: {
      return { ...state, pickup: action.payload };
    }
    case RideActionTypes.SET_DESTINATION: {
      return { ...state, destination: action.payload };
    }
    case RideActionTypes.SET_VEHICLE_TYPE: {
      return { ...state, vehicleType: action.payload };
    }
    case RideActionTypes.SET_FARE: {
      return { ...state, fare: action.payload };
    }
    case RideActionTypes.RESET: {
      return initialState;
    }
    default:
      return state;
  }
};

export const RideContextProvider = ({ children }) => {
  const [rideState, dispatchRide] = useReducer(rideReducer, initialState);
  const [rideData, setRideData] = useState({});
  const api = useApiPrivate();

  async function createRide({ pickup, destination, vehicleType }) {
    if (!pickup || !destination || !vehicleType) return;

    try {
      const response = await api.post("/rides", {
        pickup: pickup,
        destination: destination,
        vehicleType,
      });
      console.log(response.data);
      return response.data?.data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async function fetchVehicleFare(pickup, destination) {
    if (!pickup || !destination) return;
    try {
      const response = await api.get(
        `/rides/get-fare?pickup=${decodeURIComponent(
          pickup
        )}&destination=${decodeURIComponent(destination)}`
      );

      console.log(response.data?.data);
      return response.data?.data;
    } catch (error) {
      console.log(error);
    }
  }

  const confirmRide = async () => {
    const { pickup, destination, vehicleType } = rideState;
    const data = await createRide({
      pickup: pickup?.description,
      destination: destination?.description,
      vehicleType,
    });

    setRideData(data);
    return data;
  };

  const cancelRide = async () => {
    dispatchRide({ type: RideActionTypes.RESET });
    setRideData({});
  };

  const getFare = async () => {
    const { pickup, destination } = rideState;

    const data = await fetchVehicleFare(
      pickup?.description,
      destination?.description
    );

    dispatchRide({
      type: RideActionTypes.SET_FARE,
      payload: data,
    });
  };

  useEffect(() => {
    if ((rideState.pickup, rideState.destination)) getFare();
  }, [rideState.pickup, rideState.destination]);

  return (
    <rideContext.Provider
      value={{
        rideState,
        dispatchRide,
        rideData,
        setRideData,
        confirmRide,
        cancelRide,
        getFare,
      }}
    >
      {children}
    </rideContext.Provider>
  );
};

export default rideContext;
