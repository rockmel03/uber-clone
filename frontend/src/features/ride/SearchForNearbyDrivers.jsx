import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { VEHICLE_IMAGES } from "../../constants";
import useRideContext from "../../hooks/useRideContext";
import useSocket from "../../hooks/useSocket";

const vehicleImages = VEHICLE_IMAGES;

export const SearchForNearbyDrivers = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { vehicleType } = useParams();
  const { rideData } = useRideContext();
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

  const { socket } = useSocket();

  useEffect(() => {
    console.log(rideData);
    if (rideData.length > 0) socket.emit("search-ride", rideData);
  }, [rideData]);

  return (
    <div
      ref={nearbyPannelRef}
      className="p-5 w-full fixed z-10 translate-y-full bg-white"
    >
      <h2 className="text-xl text-center font-semibold">
        Looking for nearby drivers
      </h2>
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
          <p className="text-gray-700 leading-tight">{rideData?.pickup}</p>
        </div>
      </div>
      <hr />

      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-stop-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">Third Wave Coffee</h3>
          <p className="text-gray-700 leading-tight">{rideData?.destination}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-bank-card-2-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">₹{rideData?.fare}</h3>
          <p className="text-gray-700 leading-tight">
            {rideData?.paymentDetails?.status}
          </p>
        </div>
      </div>
    </div>
  );
};
