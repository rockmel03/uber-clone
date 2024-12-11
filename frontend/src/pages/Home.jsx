import { useState } from "react";
import InputFeild from "../components/InputFeild";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);

  return (
    <section
      className="w-full h-screen flex flex-col justify-end"
      style={{
        backgroundImage:
          "url(https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg)",
      }}
    >
      <form className="p-5 bg-white rounded-lg flex flex-col gap-3 relative z-10">
        {pannelOpen ? (
          <div className="w-fit text-2xl" onClick={() => setPannelOpen(false)}>
            <i className="ri-arrow-down-s-line"></i>
          </div>
        ) : (
          <h2 className="font-semibold text-xl">Find a trip</h2>
        )}
        <InputFeild
          type="text"
          className="pl-12"
          placeholder="Add a pick-up location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          onFocus={() => setPannelOpen(true)}
        />
        <InputFeild
          type="text"
          className="pl-12"
          placeholder="Enter your destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onFocus={() => setPannelOpen(true)}
        />
        <div className=" flex justify-between">
          <button
            onClick={() => setPannelOpen(false)}
            className="w-fit px-2 py-1 rounded-full bg-[#eee] text-sm font-semibold flex items-center justify-between gap-2"
          >
            <span>
              <i className="ri-time-fill"></i>
            </span>
            Leave Now
            <span>
              <i className="ri-arrow-down-s-line"></i>
            </span>
          </button>

          <button
            type="submit"
            disabled={!pickup || !destination}
            className="bg-black text-white px-4 rounded-full disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </form>
      <div
        className={`${
          pannelOpen ? "h-full" : "h-0"
        } w-full  px-5 bg-white overflow-hidden transition-all duration-500`}
      >
        <article className="flex gap-2 rounded-lg p-3 border-2 border-transparent hover:border-black ">
          <div className="flex-shrink-0 w-10 h-10 bg-[#eee] rounded-full grid place-items-center text-lg">
            <i className="ri-map-pin-2-fill"></i>
          </div>
          <h4 className="text-lg font-semibold leading-tight">
            Pahadpani, Dhari, Nainital - 263132 uttarakhand
          </h4>
        </article>
        <article className="flex gap-2 rounded-lg p-3 border-2 border-transparent hover:border-black ">
          <div className="flex-shrink-0 w-10 h-10 bg-[#eee] rounded-full grid place-items-center text-lg">
            <i className="ri-map-pin-2-fill"></i>
          </div>
          <h4 className="text-lg font-semibold leading-tight">
            Pahadpani, Dhari, Nainital - 263132 uttarakhand
          </h4>
        </article>
      </div>
    </section>
  );
};

export default Home;
