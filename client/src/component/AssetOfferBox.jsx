import React, { useState } from "react";
import {LocalHospital,
  Restaurant,
  GppMaybe,
  School,
  Language,
  Person,
  Public,
  Phone,
} from "@mui/icons-material"; // Import MUI icons
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
const aidStyles = {
  health: {
    color: "#B2BEB5",
    icon: <LocalHospital style={{ fontSize: "24px" }} />,
  },
  education: {
    color: "#ADD8E6",
    icon: <School />,
  },
  emergency: {
    color: "#98AFC7",
    icon: <GppMaybe />,
  },
  food: {
    color: "#D3D3D3",
    icon: <Restaurant />,
  },
  technology: {
    color: "#D3D3D3",
    icon: <Language />,
  },
  other: {
    color: "#FF7E1",
    icon: <CardGiftcardIcon/>,
  },
};

export default function AssetOfferBox({ offer}) {
  const [showFullAIDINFO, setShowFullAIDINFO] = useState(false);

  const toggleAIDINFO = () => {
    setShowFullAIDINFO(!showFullAIDINFO);
  };

  return (
    <div className="w-3/4 flex flex-col justify-center items-center mx-auto">
      <div className="border border-gray-500 rounded w-full max-w-md-40">
        <div
          className="flex flex-row w-full text-3xl space-x-7 p-2"
          style={{ backgroundColor: aidStyles[offer.aidType].color }}
        >
          {aidStyles[offer.aidType].icon}
          <h3 className="">{offer.aidName}</h3>
        </div>
        <div className="p-4 font-semibold font-sans">
          <p>
            {" "}
            <span className="text-black-500">
              {showFullAIDINFO
                ? offer.aidInfo
                : `${offer.aidInfo.substring(0, 85)}...`}
            </span>{" "}
            <button
              className="text-white bg-blue-500 px-4 py-2 rounded-md ml-2 text-sm"
              onClick={toggleAIDINFO}
            >
              {showFullAIDINFO ? "Less" : "More"}
            </button>
          </p>

          {/* Combined container for Donee AIDNAME, Country, and Phone Number with icons */}
          <div className="rounded mt-4 flex justify-center items-center">
            <Person className="mr-1" /> <p className="mr-6">{offer.accountInfo[0].name}</p>
            <Public className="mx-1" /> <p className="mx-">{offer.accountInfo[0].country}</p>
            <Phone className="ml-10" /> <p className="ml">{offer.accountInfo[0].phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
