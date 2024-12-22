import { toast } from "react-toastify";
import { DropDownPannel } from "../../../components/DropDownPannel";
import { useApiPrivate } from "../../../hooks/useApiPrivate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CaptainRiding = () => {
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

  useEffect(() => {
    fetchRideData(rideId);
  }, []);

  const navigate = useNavigate();

  const handleFinishRideClick = async () => {
    try {
      const response = await api.post(`/rides/finish/${rideId}`);
      console.log(response);
      if (response.status === 200) {
        navigate("/captain");
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message || "failed to finish ride");
    }
  };

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
              {ride?.user?.fullname &&
                Object.values(ride?.user?.fullname).join(" ")}
            </h3>
            <p className="text-xs opacity-60 font-medium uppercase">
              passanger
            </p>
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
      <button
        onClick={handleFinishRideClick}
        className="w-full bg-blue-500 text-white font-semibold py-4 uppercase"
      >
        finish ride
      </button>
    </DropDownPannel>
  );
};
