import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useApiPrivate } from "../../../hooks/useApiPrivate";
import { toast } from "react-toastify";

export const AcceptRide = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState({});
  const api = useApiPrivate();
  const location = useLocation();
  const from = location?.from?.pathname || -1;

  const handleGoBack = () => {
    navigate(from);
  };

  const containerRef = useRef(null);
  useGSAP(() => {
    gsap.from(containerRef.current, {
      transform: "translate(0%,100%)",
      duration: 0.5,
    });
  });

  const handleAccept = async (id) => {
    try {
      const response = await api.post("/rides/accept", { rideId: id });
      if (response.status === 200) {
        navigate(`/captain/rides/otp/${id}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "failed to accept ride");
    }
  };

  useEffect(() => {
    const fetchRide = async (id) => {
      try {
        const response = await api.get(`/rides/${id}`);
        if (response.status === 200) {
          setRide(response.data.data);
        }
      } catch (error) {
        console.log("failed to fetch ride", error);
        toast.error("failed to fetch ride");
      }
    };

    if (rideId) fetchRide(rideId);
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
              Looking for a driver
            </p>
          </div>
        </div>
        <div className="text-end">
          <h3 className="text-lg font-semibold">₹{ride?.fare}</h3>
          <p className="text-xs opacity-60 font-medium uppercase">2.3 KM</p>
        </div>
      </div>

      <div className="p-5">
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
      </div>
      <button
        disabled={ride?.status === "pending" ? false : true}
        onClick={() => handleAccept(ride?._id)}
        className=" w-full py-4 pb-10 font-semibold uppercase text-black bg-yellow-400"
      >
        go to pick up
      </button>
    </section>
  );
};
