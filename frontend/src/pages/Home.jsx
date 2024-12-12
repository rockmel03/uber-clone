import { useState } from "react";
import InputFeild from "../components/InputFeild";
import { VehiclePannel } from "../components/VehiclePannel";
import { LocationsPannel } from "../components/LocationsPannel";

import carImage from "../assets/car.webp";
import autoImage from "../assets/auto.webp";
import motoImage from "../assets/moto.webp";
import { SearchForNearbyDrivers } from "../components/SearchForNearbyDrivers";

const vehicleArray = [
  {
    title: "UberGo",
    capacity: 3,
    type: "car",
    image: carImage,
    time: "2 min",
    fairAmount: 123.1,
  },
  {
    title: "Moto",
    capacity: 1,
    type: "motorcycle",
    image: motoImage,
    time: "2 min",
    fairAmount: 65.22,
  },
  {
    title: "Auto",
    capacity: 3,
    type: "auto",
    image: autoImage,
    time: "2 min",
    fairAmount: 120.3,
  },
];

const locationArray = [
  {
    id: 0,
    title: "Pahadpani, Dhari, Nainital - 263132 uttarakhand",
  },
  {
    id: 1,
    title: "Shelalekh, Paharpani, Nainital - 263132 uttarakhand",
  },
  {
    id: 2,
    title: "Nainital - 263132 uttarakhand",
  },
];

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [pickupFocused, setPickupFocused] = useState(false);

  const [destination, setDestination] = useState("");
  const [destniationFocused, setDestinationFocused] = useState(false);

  const [pannelOpen, setPannelOpen] = useState(false);
  const [locations, setLocations] = useState(locationArray);

  const [vehiclePannelOpen, setVehiclePannelOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState(vehicleArray);

  const [searchVehiclePannelOpen, setSearchVehiclePannelOpen] = useState(false);

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

  const handleLocationClick = (e) => {
    const findedLocation = locations.find(
      (item) => item.id === Number(e.target.id)
    );
    if (pickupFocused && findedLocation) {
      setPickup(findedLocation.title);
    } else if (destniationFocused && findedLocation) {
      setDestination(findedLocation.title);
    }
  };

  const handleNextClick = () => {
    setPannelOpen(false);
    setVehiclePannelOpen(true);
  };

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
        vehicleData={vehicleData}
        setIsOpen={setVehiclePannelOpen}
      />
      <SearchForNearbyDrivers isOpen={searchVehiclePannelOpen} />
    </section>
  );
};

export default Home;
