import { useEffect, useState } from "react";
import InputFeild from "../components/InputFeild";
import { VehiclePannel } from "../components/VehiclePannel";
import { LocationsPannel } from "../components/LocationsPannel";

import { SearchForNearbyDrivers } from "../components/SearchForNearbyDrivers";
import { useApiPrivate } from "../hooks/useApiPrivate";
import { ConfirmRide } from "../components/ConfirmRide";

const Home = () => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [pickup, setPickup] = useState("");
  const [pickupFocused, setPickupFocused] = useState(false);

  const [destination, setDestination] = useState("");
  const [destniationFocused, setDestinationFocused] = useState(false);

  const [pannelOpen, setPannelOpen] = useState(false);
  const [locations, setLocations] = useState([]);

  const [vehiclePannelOpen, setVehiclePannelOpen] = useState(false);
  const [vehicleFare, setVehicleFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);

  const [confirmRidePannelOpen, setConfirmRidePannelOpen] = useState(false);
  const [searchVehiclePannelOpen, setSearchVehiclePannelOpen] = useState(false);

  const [rideData, setRideData] = useState(null);

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

  async function getFareByVehicle(pickup, destination) {
    try {
      const response = await api.get(
        `/rides/get-fare?pickup=${decodeURIComponent(
          pickup
        )}&destination=${decodeURIComponent(destination)}`
      );

      console.log(response.data?.data);
      setVehicleFare(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createRide() {
    try {
      const response = await api.post("/rides", {
        pickup,
        destination,
        vehicleType,
      });
      console.log(response.data);
      setRideData(response.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handlePickupChange = (e) => {
    setPickup(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleLocationClick = (e) => {
    const findedLocation = locations.find(
      (item) => item.place_id === e.target.id
    );
    if (pickupFocused && findedLocation) {
      setPickup(findedLocation.description);
    } else if (destniationFocused && findedLocation) {
      setDestination(findedLocation.description);
    }
  };

  const handleNextClick = async () => {
    await getFareByVehicle(pickup, destination);
    setPannelOpen(false);
    setVehiclePannelOpen(true);
  };

  const handleVehicleClick = (vehicle) => {
    setVehicleType(vehicle);
    setConfirmRidePannelOpen(true);
  };

  const confirmRide = async () => {
    await createRide();
    setConfirmRidePannelOpen(false);
    setSearchVehiclePannelOpen(true);
  };
  const cancleRide = () => {
    setPickup("");
    setDestination("");
    setVehicleType(null);
    setPannelOpen(false);
    setVehiclePannelOpen(false);
    setConfirmRidePannelOpen(false);
    setSearchVehiclePannelOpen(false);
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

  return (
    <section
      className="w-full h-screen flex flex-col justify-end"
      style={{
        backgroundImage:
          "url(https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg)",
      }}
    >
      <div className="p-5 bg-white rounded-lg flex flex-col gap-3 relative z-10">
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
          onChange={handlePickupChange}
          onFocus={handlePickupFocus}
        />
        <InputFeild
          type="text"
          className="pl-12"
          placeholder="Enter your destination"
          autoComplete="off"
          value={destination}
          onChange={handleDestinationChange}
          onFocus={handleDestinationFocus}
        />
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
      <VehiclePannel
        isOpen={vehiclePannelOpen}
        setIsOpen={setVehiclePannelOpen}
        vehicleFare={vehicleFare}
        handleVehicleClick={handleVehicleClick}
      />
      <ConfirmRide
        isOpen={confirmRidePannelOpen}
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
        fare={vehicleFare}
        cancleRide={cancleRide}
        confirmRide={confirmRide}
      />
      <SearchForNearbyDrivers
        isOpen={searchVehiclePannelOpen}
        rideData={rideData}
        vehicleType={vehicleType}
      />
    </section>
  );
};

export default Home;
