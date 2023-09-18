import React from "react";
import { Link } from "react-router-dom";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import HomeIcon from "@mui/icons-material/Home";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";

const Navbar = () => {
  return (
    <div className="bg-slate-950 w-full p-2 pt-1  text-ls font-light border-b-2 border-gray-500 ">
      <ul className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-16">
        <li>
          <Link
            to="/"
            className="text-white hover:text-blue-300 flex items-center"
          >
            <HomeIcon className="mr-2" /> Donation Offers
          </Link>
        </li>

        <li>
          <Link
            to="/user-donations-launches"
            className="text-white hover:text-blue-300 flex items-center"
          >
            <AutoStoriesRoundedIcon className="mr-2" />
            Your Request
          </Link>
        </li>
        <li>
          <Link
            to="launch-donations"
            className="text-white hover:text-blue-300 flex items-center"
          >
            <RocketLaunchRoundedIcon className="mr-2" /> Launch Request
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className="text-white hover:text-blue-300 flex items-center"
          >
            <WorkHistoryIcon className="mr-2" /> View History
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="text-white hover:text-blue-300 flex items-center"
          >
            <PersonRoundedIcon className="mr-2" /> Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
