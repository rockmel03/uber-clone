import { toast } from "react-toastify";
import { VerifyOtpPannel } from "./VerifyOtpPannel";
import { useNavigate } from "react-router-dom";
import { useApiPrivate } from "../../../hooks/useApiPrivate";
import useRideContext from "../../../hooks/useRideContext";
import { useState } from "react";
import { RIDE_STATUS_ENUM } from "../../../constants";

export const VerifyOtpButton = () => {
  const { rideData, setRideData } = useRideContext();

  const [otpPannel, setOtpPannel] = useState(false);
  const api = useApiPrivate();
  const navigate = useNavigate();

  const verifyOtp = async (otp) => {
    try {
      const response = await api.post(`/rides/otp/${rideData?._id}`, { otp });
      
      if (response.status === 200) {
        toast.success("OTP Verified");
        setRideData(response?.data?.data);
        navigate(`/rides/${response?.data?.data?._id}/ongoing`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "failed to verify otp");
    }
  };

  return (
    rideData?.status === RIDE_STATUS_ENUM.accepted && (
      <>
        <button
          onClick={() => setOtpPannel(true)}
          className="w-full mt-2 p-5 bg-yellow-500 font-semibold grid place-items-center"
        >
          VERIFY OTP
        </button>
        {otpPannel && (
          <VerifyOtpPannel
            isOpen={otpPannel}
            setIsOpen={setOtpPannel}
            verifyOtp={verifyOtp}
          />
        )}
      </>
    )
  );
};
