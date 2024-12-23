import { NavLink, useNavigate } from "react-router-dom";
import { DashboardButtom } from "./Dashboard/DashboardButtom";

import { useLogout } from "../../hooks/useLogout";

const navLinks = [
  {
    name: "home",
    url: "/captain",
    icon: "",
    iconElement: <i className="ri-home-5-line"></i>,
  },
  {
    name: "profile",
    url: "/profile",
    icon: "",
    iconElement: <i className="ri-profile-line"></i>,
  },
  {
    name: "notification",
    url: "/captain/notification",
    icon: "",
    iconElement: <i className="ri-notification-3-line"></i>,
  },
  {
    name: "history",
    url: "/captain/history",
    icon: "",
    iconElement: <i className="ri-history-line"></i>,
  },
];

export const CaptainNav = ({ closeNavPannel }) => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <nav className="w-full h-full ">
      <div className="px-5">
        <DashboardButtom
          totalTime={10.5}
          totalDistance={"30 km"}
          totalRides={20}
        />
      </div>
      <br />
      <ul
        onClickCapture={() => closeNavPannel()}
        className="flex flex-col px-5 gap-1"
      >
        {navLinks.length > 0 &&
          navLinks.map((link, idx) => {
            return (
              <li key={idx} className="w-full">
                <NavLink
                  to={link.url}
                  className={(state) =>
                    `${
                      state.isActive ? "bg-zinc-100" : ""
                    } w-full px-2 py-2 text-lg font-semibold capitalize hover:bg-zinc-50 rounded-lg flex items-center gap-2`
                  }
                >
                  <div className="w-10 h-10 grid place-items-center text-3xl font-light">
                    {link.iconElement}
                  </div>
                  {link.name}
                </NavLink>
              </li>
            );
          })}

        <li className="w-full">
          <button
            onClick={handleLogout}
            className="w-full px-2 py-2 text-lg font-semibold capitalize hover:bg-zinc-50 rounded-lg flex items-center gap-2"
          >
            <div className="w-10 h-10 grid place-items-center text-3xl font-light">
              <i className="ri-logout-box-r-line"></i>
            </div>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
