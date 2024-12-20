import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiPrivate } from "../../../hooks/useApiPrivate";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { VerifyOtpPannel } from "./VerifyOtpPannel";

export const MatchOTP = () => {
  const { rideId } = useParams();
  const [ride, setRide] = useState({});
  const [otpPannel, setOtpPannel] = useState(false);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useGSAP(() => {
    gsap.from(containerRef.current, {
      transform: "translateY(100%)",
      duration: 0.5,
    });
  }, []);

  const api = useApiPrivate();

  const verifyOtp = (otp) => {
    console.log("otp : ", otp);
  };

  const fetchRideData = async (id) => {
    try {
      const resoponse = await api.get(`/rides/${id}`);
      console.log(resoponse);
      if (resoponse.status === 200) setRide(resoponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (rideId) fetchRideData(rideId);
  }, [rideId]);
  return (
    <section
      ref={containerRef}
      className="fixed z-10 bg-white w-full max-h-screen overflow-scroll shadow-[0_0_8px_#00000050]"
    >
      <div className="py-5 flex items-center justify-center sticky z-[1] w-full top-0 bg-white shadow-sm">
        <button
          onClick={handleGoBack}
          className="absolute left-2 w-10 h-10 rounded-full hover:bg-zinc-100 active:bg-zinc-100 active:scale-90 cursor-pointer"
        >
          <span className="text-2xl">
            <i className="ri-arrow-left-line"></i>
          </span>
        </button>

        <h2 className="text-xl font-semibold text-center">#{rideId}</h2>
      </div>

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
              passenger
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
      </div>

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
    </section>
  );
};
