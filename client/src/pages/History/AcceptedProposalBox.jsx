import React, { useState } from "react";
import {Link} from "react-router-dom";
import {
  LocalHospital,
  Restaurant,
  GppMaybe,
  School,
  Language,
  Person,
  Public,
  Phone,
} from "@mui/icons-material"; // Import MUI icons

const aidStyles = {
  Health: {
    color: "#B2BEB5",
    icon: <LocalHospital style={{ fontSize: "24px" }} />,
  },
  Educational: {
    color: "#ADD8E6",
    icon: <School />,
  },
  Emergency: {
    color: "#98AFC7",
    icon: <GppMaybe />,
  },
  Food: {
    color: "#D3D3D3",
    icon: <Restaurant />,
  },
  Technical: {
    color: "#D3D3D3",
    icon: <Language />,
  },
};

export default function AcceptedProposalBox({ offer , showTargetAndFunded}) {
  const [showFullAidInfo, setShowFullAidInfo] = useState(false);

  const toggleAidInfo = () => {
    setShowFullAidInfo(!showFullAidInfo);
  };

  return (
    <div className="w-3/4 flex flex-col justify-center items-center mx-auto">
      <div className="border border-gray-500 rounded w-full max-w-md-40">
        <div
          className="flex flex-row w-full text-3xl space-x-7 p-2"
          style={{ backgroundColor: aidStyles[offer.aidType].color }}
        >
          {aidStyles[offer.aidType].icon}
          <Link to={`/aid/${offer.tID}`} className="hover:underline">
            <h3 className="">{offer.name}</h3>
          </Link>
        </div>
        <div className="p-4 font-semibold font-sans">
          <p>
            {" "}
            <span className="text-black-500">
              {showFullAidInfo
                ? offer.aidinfo
                : `${offer.aidinfo.substring(0, 90)}...`}
            </span>{" "}
            <button
              className="text-white bg-blue-500 px-4 py-2 rounded-md ml-2 text-sm"
              onClick={toggleAidInfo}
            >
              {showFullAidInfo ? "Less" : "More"}
            </button>
          </p>

          {/* container for target and funded amount */}
          {showTargetAndFunded && (
          <div className="bg-blue-100 p-4 rounded mt-4 flex justify-center items-center">
            <p className="mr-20" style={{ fontSize: "20px" }}>Target: {offer.targetamount}</p>
            <p className="ml-20" style={{ fontSize: "20px" }}>Funded Amount: {offer.fundedinether}</p>
          </div>
        )}


          {/* Combined container for Donee Name, Country, and Phone Number with icons */}
          <div className="p-4 rounded mt-4 flex justify-center items-center">
            <Person className="mr-1" /> <p className="mr-6">{offer.doneename}</p>
            <Public className="mx-1" /> <p className="mx-">{offer.country}</p>
            <Phone className="ml-10" /> <p className="ml">{offer.phonenumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
