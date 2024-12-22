import { useEffect, useState } from "react";
import { DropDownPannel } from "../../components/DropDownPannel";
import { useApiPrivate } from "../../hooks/useApiPrivate";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

export const Riding = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState({});

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

  const { socket } = useSocket();

  useEffect(() => {
    fetchRideData(rideId);
    socket.on("ride-finished", (response) => {
      toast.success(response?.message);
      setRide(response?.data);
    });
  }, []);
  return (
    <DropDownPannel>
      <div className="w-full p-3 bg-green-500">
        <h5 className="text-lg text-center capitalize font-semibold">
          {ride?.status}
        </h5>
      </div>
      <div className="w-full flex items-center justify-between bg-gray-100 p-5">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-zinc-100 overflow-hidden border-2 border-black">
            <img
              src={
                "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {ride?.captain?.fullname &&
                Object.values(ride?.captain?.fullname).join(" ")}
            </h3>
            <p className="text-xs opacity-60 font-medium uppercase">captain</p>
          </div>
        </div>
        <div className="text-end">
          <h3 className="text-lg font-semibold">₹{ride?.fare}</h3>
          <p className="text-xs opacity-60 font-medium uppercase">2.3 KM</p>
        </div>
      </div>
      <div className="px-5 pt-5">
        <p className="opacity-70 leading-tight font-semibold capitalize text-sm">
          vehicle details
        </p>
        <ul>
          {ride?.captain?.details?.vehicle &&
            Object.entries(ride?.captain?.details?.vehicle).map(
              ([key, value]) => (
                <li
                  key={key}
                  className=" font-semibold flex justify-between capitalize  "
                >
                  <span>{key}</span>
                  <span>{value}</span>
                </li>
              )
            )}
        </ul>
        <hr className="my-3" />
      </div>

      <div className="px-5">
        <p className="opacity-70 leading-tight font-semibold capitalize text-sm">
          pickup
        </p>
        <h3 className="text-lg font-semibold">{ride?.pickup}</h3>
        <hr className="my-3" />
        <p className="opacity-70 leading-tight font-semibold capitalize text-sm">
          destination
        </p>
        <h3 className="text-lg font-semibold">{ride?.destination}</h3>
        <hr className="my-3" />
        <p className="opacity-70 leading-tight font-semibold capitalize text-sm">
          fare amount
        </p>
        <h3 className="text-lg font-semibold">₹{ride?.fare}</h3>
        <br />
      </div>
      {ride?.status === "completed" && (
        <Link
          to={`payment/${ride._id}`}
          className="grid place-items-center w-full bg-red-500 text-white font-semibold py-4 uppercase"
        >
          Make Payment
        </Link>
      )}
    </DropDownPannel>
  );
};
