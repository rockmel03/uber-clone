import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApiPrivate } from "../../../hooks/useApiPrivate";
import useRideContext from "../../../hooks/useRideContext";
import { RIDE_STATUS_ENUM } from "../../../constants";

export const AcceptRideButton = () => {
  const { rideData, setRideData } = useRideContext();

  const navigate = useNavigate();
  const api = useApiPrivate();

  const handleAccept = async (id) => {
    try {
      const response = await api.post("/rides/accept", { rideId: id });
      
      if (response.status === 200) {
        setRideData(response?.data?.data);
        navigate(`/rides/${response?.data?.data._id}/verify`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "failed to accept ride");
    }
  };

  return (
    rideData?.status === RIDE_STATUS_ENUM.pending && (
      <button
        disabled={rideData?.status === RIDE_STATUS_ENUM.pending ? false : true}
        onClick={() => handleAccept(rideData?._id)}
        className=" w-full py-4 pb-10 font-semibold uppercase text-black bg-yellow-400"
      >
        go to pick up
      </button>
    )
  );
};
