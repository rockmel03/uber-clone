export const RideNotificationCard = ({ handleAccept, handleIgnore }) => {
  return (
    <div className="p-5 shadow-sm">
      <div className="w-full flex items-center justify-between">
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
            <h3 className="text-lg font-semibold">Jhone Doe</h3>
            <p className="text-xs opacity-60 font-medium uppercase">
              Looking for a car
            </p>
          </div>
        </div>
        <div className="text-end">
          <h3 className="text-lg font-semibold">₹325.00</h3>
          <p className="text-xs opacity-60 font-medium uppercase">2.3 KM</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex gap-2 items-center py-2">
          <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
            <i className="ri-map-pin-range-fill"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold">562/11-A</h3>
            <p className="opacity-70 leading-tight font-semibold">Pickup</p>
          </div>
        </div>
        <hr />
        <div className="flex gap-2 items-center py-2">
          <div className="flex-shrink-0 w-10 h-10 grid place-items-center text-2xl">
            <i className="ri-stop-fill"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Third Wave Coffee</h3>
            <p className="opacity-70 leading-tight font-semibold">
              Destination
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className="flex gap-2">
        <button
          onClick={handleIgnore}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded font-semibold active:scale-90 transition duration-150"
        >
          Ignore
        </button>
        <button
          onClick={handleAccept}
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded font-semibold active:scale-90 transition duration-150"
        >
          Accept
        </button>
      </div>
    </div>
  );
};
