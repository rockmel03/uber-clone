import { useEffect, useState } from "react";
import InputFeild from "../../components/InputFeild";
import { LocationsPannel } from "./LocationsPannel";
import { useApiPrivate } from "../../hooks/useApiPrivate";
import useRideContext from "../../hooks/useRideContext";
import { RideActionTypes } from "../../context/rideContext";
import { Outlet, useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";

export const FindATrip = () => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [pickup, setPickup] = useState("");
  const [pickupFocused, setPickupFocused] = useState(false);

  const [destination, setDestination] = useState("");
  const [destniationFocused, setDestinationFocused] = useState(false);

  const [pannelOpen, setPannelOpen] = useState(false);
  const [locations, setLocations] = useState([]);

  const { dispatchRide } = useRideContext();
  const navigate = useNavigate();

  const handleLocationClick = (e) => {
    const findedLocation = locations.find(
      (item) => item.place_id === e.target.id
    );
    if (pickupFocused && findedLocation) {
      setPickup(findedLocation.description);
      dispatchRide({
        type: RideActionTypes.SET_PICKUP,
        payload: findedLocation,
      });
    } else if (destniationFocused && findedLocation) {
      setDestination(findedLocation.description);
      dispatchRide({
        type: RideActionTypes.SET_DESTINATION,
        payload: findedLocation,
      });
    }
  };

  const handleNextClick = () => {
    setPannelOpen(false);
    navigate("/ride/vehicle/select");
  };

  const api = useApiPrivate();

  async function getSuggestions(query, signal) {
    try {
      const response = await api.get(`/maps/get-suggestion?search=${query}`, {
        signal: signal,
      });
      setLocations(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePickupFocus = () => {
    setPickupFocused(true);
    setPannelOpen(true);
    setDestinationFocused(false);
  };

  const handleDestinationFocus = () => {
    setDestinationFocused(true);
    setPannelOpen(true);
    setPickupFocused(false);
  };

  // optimization of unneccessary api calls for suggestions
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(pickup);
    }, 500);
    return () => clearTimeout(timeout);
  }, [pickup]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(destination);
    }, 500);
    return () => clearTimeout(timeout);
  }, [destination]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (debouncedValue) {
      getSuggestions(debouncedValue, signal);
    }

    return () => {
      controller.abort();
    };
  }, [debouncedValue]);

  const { socket } = useSocket();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.token && auth?.userId && auth?.roles) {
      socket.emit("join", { userId: auth.userId, roles: auth?.roles });
    }
  }, [auth]);

  return (
    <section className="w-full h-screen flex flex-col justify-end">
      <div className="bg-zinc-400 w-full h-full fixed -z-[1]">
        <img
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 bg-white rounded-t-lg flex flex-col gap-3 relative z-10">
        {pannelOpen ? (
          <div className="w-fit text-2xl" onClick={() => setPannelOpen(false)}>
            <i className="ri-arrow-down-s-line"></i>
          </div>
        ) : (
          <h2 className="font-semibold text-xl">Find a trip</h2>
        )}
        <InputFeild
          type="text"
          className="pl-12"
          placeholder="Add a pick-up location"
          autoComplete="off"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          onFocus={handlePickupFocus}
        />
        <InputFeild
          type="text"
          className="pl-12"
          placeholder="Enter your destination"
          autoComplete="off"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onFocus={handleDestinationFocus}
        />
        {/* <button
          disabled={!pickup || !destination}
          onClick={handleNextClick}
          className="w-full border rounded-md px-2 py-2 font-semibold bg-black text-white  disabled:opacity-80 disabled:cursor-not-allowed"
        >
          Find Trip
        </button> */}
        <div className=" flex justify-between">
          <button
            onClick={() => setPannelOpen(false)}
            className="w-fit px-2 py-1 rounded-full bg-[#eee] text-sm font-semibold flex items-center justify-between gap-2"
          >
            <span>
              <i className="ri-time-fill"></i>
            </span>
            Leave Now
            <span>
              <i className="ri-arrow-down-s-line"></i>
            </span>
          </button>

          <button
            disabled={!pickup || !destination}
            onClick={handleNextClick}
            className="bg-black text-white px-4 rounded-full disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
      <LocationsPannel
        isOpen={pannelOpen}
        locations={locations}
        handleLocationClick={handleLocationClick}
      />
      <Outlet />
    </section>
  );
};
