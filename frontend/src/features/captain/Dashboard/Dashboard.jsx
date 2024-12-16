import { DashboardButtom } from "./DashboardButtom";
import { DashboardTop } from "./DashboardTop";

export const Dashboard = () => {
  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <DashboardTop
        fullName={"Jhone Doe"}
        profileImage={""}
        title={"car driver"}
        totalEarnings={325.0}
      />
      <DashboardButtom
        totalTime={10.5}
        totalDistance={"30 km"}
        totalRides={20}
      />
    </div>
  );
};
