import { useGSAP } from "@gsap/react";
import carImage from "../assets/car.webp";
import { useRef } from "react";
import gsap from "gsap";

export const SearchForNearbyDrivers = ({isOpen}) => {
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
      className="p-5  fixed z-10 translate-y-full bg-white"
    >
      <h2 className="text-xl text-center font-semibold">
        Looking for nearby drivers
      </h2>
      <div className="h-[30vh] flex items-center justify-center">
        <img src={carImage} alt="" className="max-w-40 h-full object-contain" />
      </div>
      <hr />

      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-map-pin-range-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">562/11-A</h3>
          <p className="text-gray-700 leading-tight">
            Kaikondrahalli, Bengluru, Karnataka
          </p>
        </div>
      </div>
      <hr />

      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-stop-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">Third Wave Coffee</h3>
          <p className="text-gray-700 leading-tight">
            17th cross Rd, PWD Quarters, 1st sector HSR Layout, Bengluru
            Karnataka
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-bank-card-2-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">₹193.20</h3>
          <p className="text-gray-700 leading-tight">Cash Cash</p>
        </div>
      </div>
    </div>
  );
};
