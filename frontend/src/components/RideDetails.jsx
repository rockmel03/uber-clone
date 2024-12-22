import { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useApiPrivate } from "../hooks/useApiPrivate";
import { DropDownPannel } from "./DropDownPannel";
import { RideDetail } from "./RideDetail";
import useAuth from "../hooks/useAuth";
import useRideContext from "../hooks/useRideContext";
import useSocket from "../hooks/useSocket";
import { RIDE_STATUS_ENUM } from "../constants";

export const RideDetails = () => {
  const { rideId } = useParams();
  const { rideData: ride, setRideData: setRide } = useRideContext();
  const { auth } = useAuth();
  const isCaptain = auth?.roles?.includes("captain");

  const api = useApiPrivate();

  const fetchRideData = async (id) => {
    try {
      const resoponse = await api.get(`/rides/${id}`);
      if (resoponse.status === 200) setRide(resoponse.data.data);
    } catch (error) {
      console.error("failed to fetch ride data", error);
      toast.error("failed to fetch ride data");
    }
  };

  useEffect(() => {
    if (rideId) fetchRideData(rideId);
  }, [rideId]);

  const { socket } = useSocket();

  useEffect(() => {
    if (!isCaptain) {
      socket.on("otp-verified", (res) => {
        toast.success(res?.message);
        setRide(res.data);
      });
      socket.on("ride-finished", (response) => {
        toast.success(response?.message);
        setRide(response?.data);
      });
    }
    return () => {
      if (!isCaptain) {
        socket.removeListener("otp-verified");
        socket.removeListener("ride-finished");
      }
    };
  }, []);

  return !ride ? (
    <p className="text-red-500">ride not found</p>
  ) : (
    <section className="w-full h-screen flex flex-col justify-end">
      <div className="bg-zinc-400 w-full h-full fixed -z-[1]">
        <img
          src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <DropDownPannel>
        <RideDetail ride={ride} isCaptain={isCaptain} />
        {!isCaptain && ride?.status === "accepted" && ride?.otp && (
          <div className="mt-3 py-3 w-full bg-yellow-500 font-semibold grid place-items-center">
            <h3 className="text-lg">OTP</h3>
            <p className="text-xl">{ride?.otp}</p>
          </div>
        )}
        {!isCaptain &&
          ride?.status === RIDE_STATUS_ENUM.completed &&
          ride?.paymentDetails?.status === "pending" && (
            <Link
              to={`/rides/${ride._id}/payment`}
              className="grid place-items-center w-full bg-red-500 text-white font-semibold py-4 uppercase"
            >
              Make Payment
            </Link>
          )}

        {/*
         * go to pickup button
         * match otp button
         * finish ride button
         */}
        <Outlet />
      </DropDownPannel>
    </section>
  );
};
