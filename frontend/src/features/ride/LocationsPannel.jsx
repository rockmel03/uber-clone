import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export const LocationsPannel = (props) => {
  const locationsPannelRef = useRef(null);

  useGSAP(() => {
    if (props.isOpen) {
      gsap.to(locationsPannelRef.current, {
        height: "100%",
        duration: 0.5,
      });
    } else {
      gsap.to(locationsPannelRef.current, {
        height: "0%",
        duration: 0.5,
      });
    }
  }, [props.isOpen]);

  return (
    <div
      ref={locationsPannelRef}
      className="h-0 w-full  px-5 bg-white overflow-hidden flex flex-col gap-2"
    >
      {props.locations.length > 0 &&
        props.locations.map((item) => (
          <div
            key={item.place_id}
            id={item.place_id}
            onClick={props.handleLocationClick}
            className="flex gap-2 rounded-lg p-3 border-2 active:border-black "
          >
            <div className="pointer-events-none flex-shrink-0 w-10 h-10 bg-[#eee] rounded-full grid place-items-center text-lg">
              <i className="ri-map-pin-2-fill"></i>
            </div>
            <h4 className="pointer-events-none text-lg font-semibold leading-tight">
              {item.description}
            </h4>
          </div>
        ))}
    </div>
  );
};
