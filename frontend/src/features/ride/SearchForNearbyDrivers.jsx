import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { VEHICLE_IMAGES } from "../../constants";
import useRideContext from "../../hooks/useRideContext";
import useSocket from "../../hooks/useSocket";

const vehicleImages = VEHICLE_IMAGES;

export const SearchForNearbyDrivers = () => {
  const { vehicleType } = useParams();
  const { rideData } = useRideContext();
  const nearbyPannelRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.from?.pathname || "/";

  useGSAP(() => {
    gsap.from(nearbyPannelRef.current, {
      transform: "translateY(100%)",
      duration: 0.5,
    });
  }, []);

  const { socket } = useSocket();

  useEffect(() => {
    console.log(rideData);
    socket.on("ride-accepted", (data) => {
      console.log("ride-accepted : ", data);
      navigate(`/ride/${data._id}`, { from: { pathname: from } });
    });

    let timeOut;
    if (rideData?.length > 0) {
      socket.emit("search-ride", rideData);

      timeOut = setTimeout(() => {
        socket.emit("search-ride", rideData);
      }, 10000);
    }

    return () => {
      socket.removeListener("ride-accepted");
      if (timeOut) clearTimeout(timeOut);
    };
  }, [rideData]);

  return (
    <div ref={nearbyPannelRef} className="p-5 w-full fixed z-10 bg-white">
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
          <h3 className="text-xl font-semibold">{rideData?.pickup}</h3>
          <p className="opacity-70 leading-tight font-semibold">Pickup</p>
        </div>
      </div>
      <hr />

      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-stop-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{rideData?.destination}</h3>
          <p className="opacity-70 leading-tight font-semibold">Destination</p>
        </div>
      </div>
      <div className="flex gap-2 items-center py-2">
        <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
          <i className="ri-bank-card-2-fill"></i>
        </div>
        <div>
          <h3 className="text-xl font-semibold">₹{rideData?.fare}</h3>
          <p className="opacity-70 leading-tight font-semibold">
            {rideData?.paymentDetails?.status}
          </p>
        </div>
      </div>
    </div>
  );
};
