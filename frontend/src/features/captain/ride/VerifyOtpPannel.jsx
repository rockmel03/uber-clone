import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export const VerifyOtpPannel = ({ isOpen, setIsOpen, verifyOtp }) => {
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const popupRef = useRef(null);
  const InputFeildRef = useRef(null);

  useGSAP(() => {
    gsap.from(popupRef.current, {
      scale: 0,
      duration: 0.3,
    });
  }, [isOpen]);

  useEffect(() => {
    if (errorMsg) {
      InputFeildRef.current.focus();
      InputFeildRef.current.style.outlineColor = "red";
    }
    InputFeildRef.current.focus();
  }, [errorMsg]);

  useEffect(() => {
    InputFeildRef.current.style.outlineColor = "black";
    setErrorMsg("");
  }, [otp]);

  const handleOtpSubmit = () => {
    if (!otp) setErrorMsg("OTP is required");
    else if (otp.length !== 6) setErrorMsg("OTP must be 6 digits long");
    verifyOtp(otp);
  };

  return (
    <div
      id="otp-pannel"
      onClick={(e) => e.target.id === "otp-pannel" && setIsOpen(false)}
      className="w-full fixed z-10 top-0 h-screen grid place-items-center bg-zinc-900/20 p-5 "
    >
      <div
        ref={popupRef}
        className="w-full mt-2 p-5 rounded bg-white shadow font-semibold flex flex-col gap-3 relative"
      >
        <button
          onClick={() => setIsOpen(false)}
          className="w-7 h-7 bg-white text-xl rounded-full absolute -top-1 -right-1 grid place-items-center shadow"
        >
          <i className="ri-close-line"></i>
        </button>
        <h3 className=" text-2xl font-semibold capitalize text-center">
          Ride Verification
        </h3>
        <input
          ref={InputFeildRef}
          type="number"
          name="otp"
          id="otp"
          className="w-full p-2 text-lg text-center rounded"
          placeholder="Enter OTP code here..."
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <p className="text-sm text-red-500 font-semibold">{errorMsg}</p>
        <button
          onClick={handleOtpSubmit}
          className="w-full p-2 text-lg text-center rounded border bg-yellow-500"
        >
          VERIFY
        </button>
      </div>
    </div>
  );
};
