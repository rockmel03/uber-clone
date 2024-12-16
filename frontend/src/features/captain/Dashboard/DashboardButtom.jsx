import React from "react";

export const DashboardButtom = ({ totalTime, totalDistance, totalRides }) => {
  return (
    <div className="flex items-center justify-between bg-zinc-100 p-5 rounded-xl">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-extralight">
          <i className="ri-time-line"></i>
        </span>
        <h6 className="text-lg font-medium">{totalTime}</h6>
        <p className="text-xs opacity-60 font-medium uppercase">Soket Online</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-extralight">
          <i className="ri-speed-up-line"></i>
        </span>
        <h6 className="text-lg font-medium uppercase">{totalDistance}</h6>
        <p className="text-xs opacity-60 font-medium uppercase">
          Your Distance
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-extralight">
          <i className="ri-file-list-line"></i>
        </span>
        <h6 className="text-lg font-medium">{totalRides}</h6>
        <p className="text-xs opacity-60 font-medium uppercase">Your Rides</p>
      </div>
    </div>
  );
};
