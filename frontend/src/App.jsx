import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./features/auth/Login";
import { RequireAuth } from "./features/auth/RequireAuth";
import { Register } from "./features/auth/Register";

import { Home } from "./pages";
import {
  ConfirmRide,
  FindATrip,
  SearchForNearbyDrivers,
  SelectVehicle,
  RideDetails,
  Riding,
} from "./features/ride";
import { Unauthorized } from "./components/Unauthorized";
import {
  AcceptRide,
  Home as CaptainHome,
  CaptainRiding,
  MatchOTP,
  Notification,
} from "./features/captain";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={["user", "captain"]} />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["user"]} />}>
          <Route path="ride" element={<FindATrip />}>
            <Route path="confirm" element={<ConfirmRide />} />
            <Route path="vehicle">
              <Route path="select" element={<SelectVehicle />} />
              <Route
                path="search/:vehicleType"
                element={<SearchForNearbyDrivers />}
              />
            </Route>
            <Route path=":rideId" element={<RideDetails />} />
            <Route path=":rideId/riding" element={<Riding />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["captain"]} />}>
          <Route path="captain" element={<CaptainHome />}>
            <Route path="notification" element={<Notification />} />
            <Route path="rides">
              <Route path="accept/:rideId" element={<AcceptRide />} />
              <Route path="otp/:rideId" element={<MatchOTP />} />
              <Route path="riding/:rideId" element={<CaptainRiding />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
