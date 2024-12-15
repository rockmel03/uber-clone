import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { VEHICLE_DATA } from "../../constants";
import useRideContext from "../../hooks/useRideContext";
import { RideActionTypes } from "../../context/rideContext";
import { useNavigate } from "react-router-dom";

const vehicleArray = VEHICLE_DATA;

export const SelectVehicle = () => {
  const [vehicleData, setVehicleData] = useState(vehicleArray);
  const [isOpen, setIsOpen] = useState(true);

  const { rideState, dispatchRide } = useRideContext();
  const { fare } = rideState;

  const vehiclePannleRef = useRef(null);
  const navigate = useNavigate();

  const handleVehicleClick = (type) => {
    dispatchRide({
      type: RideActionTypes.SET_VEHICLE_TYPE,
      payload: type,
    });
    navigate("/ride/confirm");
  };

  useGSAP(() => {
    if (isOpen) {
      gsap.to(vehiclePannleRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
      });
    } else {
      gsap.to(vehiclePannleRef.current, {
        transform: "translateY(90%)",
        duration: 0.5,
      });
    }
  }, [isOpen]);

  return (
    <section
      ref={vehiclePannleRef}
      className="bg-white w-full fixed z-10 p-5 pt-0 flex flex-col gap-2 translate-y-full"
    >
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <span className=" text-3xl text-gray-300">
          {isOpen ? (
            <i className="ri-arrow-down-wide-fill"></i>
          ) : (
            <i className="ri-arrow-up-wide-fill"></i>
          )}
        </span>
      </button>
      <div>
        <h2 className=" text-2xl font-semibold mb-2">Select a vehicle</h2>
        {!fare ? (
          <h1>Loading...</h1>
        ) : (
          vehicleData.length > 0 &&
          vehicleData.map((vehicle, idx) => {
            const fairAmount = fare[vehicle.type];
            return (
              <div
                key={idx}
                onClick={() => handleVehicleClick(vehicle.type)}
                className="grid grid-cols-[1fr_2fr_1fr] items-center p-3 border-2 active:border-black rounded-lg"
              >
                <div>
                  <img
                    src={vehicle.image}
                    alt={vehicle.type}
                    className=" w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-base font-semibold leading-tight">
                    {vehicle.title}{" "}
                    <span>
                      <span>
                        <i className="ri-user-3-fill"></i>
                      </span>{" "}
                      <span>{vehicle.capacity}</span>
                    </span>
                  </h4>
                  <h5 className="text-sm font-medium">2 mins away</h5>
                  <p className="text-xs font-medium opacity-70">
                    Affordable, compact rides
                  </p>
                </div>
                <h3 className="font-bold text-lg justify-self-end">
                  ₹{fairAmount}
                </h3>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
