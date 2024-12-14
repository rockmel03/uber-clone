import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { VEHICLE_IMAGES } from "../constants";

const vehicleImages = VEHICLE_IMAGES;

export const ConfirmRide = ({
  isOpen,
  pickup,
  destination,
  vehicleType,
  fare,
  confirmRide,
  cancleRide,
}) => {
  const nearbyPannelRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(nearbyPannelRef.current, {
        transform: "translateY(0)",
        duration: 0.5,
      });
    } else {
      gsap.to(nearbyPannelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={nearbyPannelRef}
      className="p-5 w-full fixed z-10 translate-y-full bg-white"
    >
      <h2 className="text-xl text-center font-semibold">Confirm your Ride</h2>
      <div className="h-[30vh] flex items-center justify-center">
        <img
          src={vehicleImages[vehicleType]}
          alt=""
          className="max-w-40 h-full object-contain"
        />
      </div>
      <hr />

      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-map-pin-range-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">562/11-A</h3>
          <p className="text-gray-700 leading-tight">{pickup}</p>
        </div>
      </div>
      <hr />

      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-stop-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">Third Wave Coffee</h3>
          <p className="text-gray-700 leading-tight">{destination}</p>
        </div>
      </div>
      <hr />
      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-bank-card-2-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">₹{fare[vehicleType]}</h3>
          <p className="text-gray-700 leading-tight">Cash Cash</p>
        </div>
      </div>
      <hr />
      <button
        onClick={confirmRide}
        disabled={!pickup || !destination || !vehicleType}
        className="bg-green-500 w-full px-2 py-2 rounded-lg text-white font-semibold mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Confirm Ride
      </button>
      <button
        onClick={cancleRide}
        className="bg-gray-500 w-full px-2 py-2 rounded-lg text-white font-semibold mt-2"
      >
        Cancel Ride
      </button>
    </div>
  );
};
