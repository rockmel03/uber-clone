import { toast } from "react-toastify";
import { useApiPrivate } from "../../../hooks/useApiPrivate";
import { useNavigate } from "react-router-dom";
import useRideContext from "../../../hooks/useRideContext";
import { RIDE_STATUS_ENUM } from "../../../constants";

export const FinishRideButton = () => {
  const { rideData } = useRideContext();

  const api = useApiPrivate();
  const navigate = useNavigate();

  const handleFinishRideClick = async () => {
    try {
      const response = await api.post(`/rides/finish/${rideData?._id}`);
      console.log(response.data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message || "failed to finish ride");
    }
  };

  return (
    rideData?.status === RIDE_STATUS_ENUM.ongoing && (
      <button
        onClick={handleFinishRideClick}
        className="w-full bg-blue-500 text-white font-semibold py-4 uppercase"
      >
        finish ride
      </button>
    )
  );
};
