import React, { useContext } from "react";
import { Link } from "react-router-dom";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import HomeIcon from "@mui/icons-material/Home";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import { AuthContext } from "../contextAPI/AuthContext";

const Navbar = () => {
  const { accountType } = useContext(AuthContext);

  const navLinks = [
    { to: "/", text: "Home", icon: <HomeIcon /> },
    {
      to: `/launch-donations`,
      text: accountType === "donee" ? "Launch Aid Request" : "Launch Aid Offer",
      icon: <RocketLaunchRoundedIcon />,
    },
    {
      to: accountType === "donee" ? "/donee-history" : "/donor-history",
      text: "View History",
      icon: <WorkHistoryIcon />,
    },
    { to: "/user-account", text: "Account", icon: <PersonRoundedIcon /> },
  ];

  return (
    <div className="bg-slate-950 w-full p-2 pt-1 text-ls font-light border-b-2 border-gray-500">
      <ul className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-16">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Link
              to={link.to}
              className="text-white hover:text-blue-300 flex items-center"
            >
              {link.icon &&
                React.cloneElement(link.icon, { className: "mr-2" })}
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
