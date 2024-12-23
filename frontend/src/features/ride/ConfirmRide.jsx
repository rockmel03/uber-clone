import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { VEHICLE_IMAGES } from "../../constants";
import useRideContext from "../../hooks/useRideContext";
import { useNavigate } from "react-router-dom";

const vehicleImages = VEHICLE_IMAGES;

export const ConfirmRide = () => {
  const { rideState, confirmRide, cancelRide } = useRideContext();

  const { pickup, destination, vehicleType, fare } = rideState;
  const nearbyPannelRef = useRef(null);
  const navigate = useNavigate();

  const handleConfirmRideClick = async () => {
    const data = await confirmRide();
    navigate(
      `/ride/vehicle/search?id=${data?._id}&vehicleType=${data?.vehicleType}`
    );
  };

  const handleCancelRideClick = () => {
    cancelRide();
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useGSAP(() => {
    gsap.to(nearbyPannelRef.current, {
      transform: "translateY(0)",
      duration: 0.5,
    });
  }, []);

  const condition = pickup && destination && vehicleType && fare;

  return (
    <div
      ref={nearbyPannelRef}
      className="p-5 w-full max-h-screen overflow-auto fixed z-10 translate-y-full bg-white"
    >
      <button
        onClick={handleGoBack}
        className="w-10 h-10 rounded-full hover:bg-zinc-100 active:bg-zinc-100 active:scale-90 cursor-pointer"
      >
        <span className="text-2xl">
          <i className="ri-arrow-left-line"></i>
        </span>
      </button>
      <h2 className="text-xl text-center font-semibold">Confirm your Ride</h2>
      {!condition ? (
        <h1>loading....</h1>
      ) : (
        <>
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
              <h3 className="text-xl font-semibold">{pickup?.description}</h3>
              <p className="opacity-70 leading-tight font-semibold">Pickup</p>
            </div>
          </div>
          <hr />

          <div className="flex gap-2 items-center py-2">
            <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
              <i className="ri-stop-fill"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {destination?.description}
              </h3>
              <p className="opacity-70 leading-tight font-semibold">
                Destination
              </p>
            </div>
          </div>
          <hr />
          <div className="flex gap-2 items-center py-2">
            <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
              <i className="ri-bank-card-2-fill"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold">₹{fare[vehicleType]}</h3>
              <p className="opacity-70 leading-tight font-semibold">
                Fare Amount
              </p>
            </div>
          </div>
          <hr />
          <button
            onClick={handleConfirmRideClick}
            disabled={!pickup || !destination || !vehicleType}
            className="bg-green-500 w-full px-2 py-2 rounded-lg text-white font-semibold mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Confirm Ride
          </button>
          <button
            onClick={handleCancelRideClick}
            className="bg-gray-500 w-full px-2 py-2 rounded-lg text-white font-semibold mt-2"
          >
            Cancel Ride
          </button>
        </>
      )}
    </div>
  );
};
