import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { VEHICLE_IMAGES } from "../../constants";
import useRideContext from "../../hooks/useRideContext";
import useSocket from "../../hooks/useSocket";
import { toast } from "react-toastify";
import { useApiPrivate } from "../../hooks/useApiPrivate";

const vehicleImages = VEHICLE_IMAGES;

export const SearchForNearbyDrivers = () => {
  const [fetching, setFetching] = useState(false);

  const { rideData, setRideData } = useRideContext();
  const nearbyPannelRef = useRef(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const vehicleType = searchParams.get("vehicleType");

  const navigate = useNavigate();

  const api = useApiPrivate();
  const { socket } = useSocket();

  const rideAcceptedListener = useRef((data) => {
    setRideData(data);
    toast.success("Ride Accepted");
    navigate(`/rides/${data._id}`);
  });

  useEffect(() => {
    socket.on("ride-accepted", rideAcceptedListener.current);

    let interval;
    if (rideData && Object.keys(rideData).length > 0) {
      interval = setInterval(() => {
        socket.emit("search-ride", rideData);
      }, 30000);
    }

    // clean up
    return () => {
      socket.off("ride-accepted", rideAcceptedListener.current);
      if (interval) clearInterval(interval);
    };
  }, [rideData, socket]);

  useEffect(() => {
    const fetchRideData = async () => {
      setFetching(true);
      try {
        const res = await api.get(`/rides/${id}`);
        setRideData(res.data.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setFetching(false);
      }
    };

    if ((!rideData || !rideData._id) && !fetching) {
      fetchRideData();
    }
  }, [id, rideData, api]);

  useGSAP(() => {
    gsap.from(nearbyPannelRef.current, {
      transform: "translateY(100%)",
      duration: 0.5,
    });
  }, []);

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
