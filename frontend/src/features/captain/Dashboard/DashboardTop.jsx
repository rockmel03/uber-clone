import React from "react";
import assets from "../../../assets";

export const DashboardTop = ({
  fullName,
  title,
  profileImage,
  totalEarnings,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        <div className="w-12 h-12 rounded-full bg-zinc-100 overflow-hidden border-4 border-black">
          <img
            src={profileImage || assets.images.profilePlaceholder}
            alt="profile"
            className=" w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{fullName}</h3>
          <p className="text-xs opacity-60 font-medium uppercase">{title}</p>
        </div>
      </div>
      {totalEarnings && (
        <div className="text-end">
          <h3 className="text-lg font-semibold">₹{totalEarnings}</h3>
          <p className="text-xs opacity-60 font-medium uppercase">Earned</p>
        </div>
      )}
    </div>
  );
};
