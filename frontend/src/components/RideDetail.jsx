import assets from "../assets";
import { RIDE_STATUS_COLOR_ENUM } from "../constants";

const rideStatusColorEnum = RIDE_STATUS_COLOR_ENUM;

export const RideDetail = ({ ride, isCaptain }) => {
  const fullname = isCaptain ? ride?.user?.fullname : ride?.captain?.fullname;

  return !ride ? (
    <p className="text-red-500">ride not found</p>
  ) : (
    <>
      <div
        className="w-full p-3"
        style={{ backgroundColor: rideStatusColorEnum[ride.status] }}
      >
        <h5 className="text-lg text-center capitalize font-semibold">
          {ride?.status}
        </h5>
      </div>
      <div className="w-full flex items-center justify-between bg-gray-100 p-5">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-zinc-100 overflow-hidden border-2 border-black">
            <img
              src={assets.images.profilePlaceholder2}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              {fullname && Object.values(fullname).join(" ")}
            </h3>
            <p className="text-xs opacity-60 font-medium uppercase">
              {isCaptain ? "passenger" : "captain"}
            </p>
          </div>
        </div>
        <div className="text-end">
          <h3 className="text-lg font-semibold">₹{ride?.fare}</h3>
          <p className="text-xs opacity-60 font-medium uppercase">
            {ride?.paymentDetails?.status}
          </p>
        </div>
      </div>
      {ride?.captain && (
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
      )}
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
    </>
  );
};
