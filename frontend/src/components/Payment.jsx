import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRideContext from "../hooks/useRideContext";
import { toast } from "react-toastify";

export const Payment = () => {
  const { rideId } = useParams();
  const { rideData } = useRideContext();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");

  const handlePayNow = () => {
    // payment logic
    toast.success("payment done");
    navigate("/");
  };

  useEffect(() => {
    if (!rideData) {
      // fetch ride data
    }
  }, []);

  return (
    <section className="w-full h-full max-h-screen fixed z-10 top-0 grid place-items-center bg-zinc-900/20 p-5 ">
      <div className="w-full mt-2 p-5 rounded bg-white shadow font-semibold flex flex-col gap-3 relative">
        <h3 className=" text-2xl font-semibold capitalize text-center">
          Payment
        </h3>
        <p className="text-sm text-red-500 font-semibold">{errorMsg}</p>
        <h1>#{rideId}</h1>
        <p>₹{rideData?.fare}</p>
        <button
          onClick={handlePayNow}
          className="w-full p-2 text-lg text-center rounded border bg-yellow-500"
        >
          Pay Now
        </button>
      </div>
    </section>
  );
};
