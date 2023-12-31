import React, { useState } from "react";
import { Link } from "react-router-dom";

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

export default function LaunchedOfferBox({ offer, showAmountInEther }) {
    const [showFullAIDINFO, setShowFullAIDINFO] = useState(false);

    const toggleAIDINFO = () => {
        setShowFullAIDINFO(!showFullAIDINFO);
    };
    return (
        <div className="w-3/4 flex flex-col justify-center items-center mx-auto">
        <div className="border border-gray-500 rounded w-full max-w-md-40">
        <div
          className="flex flex-row w-full text-3xl space-x-7 p-2"
          style={{ backgroundColor: aidStyles[offer.AIDTYPE].color }}
        >
          {aidStyles[offer.AIDTYPE].icon}
          <Link to={`/aid/${offer.AIDID}`} className="hover:underline">
            <h3 className="">{offer.AIDNAME}</h3>
          </Link>
        </div>
            <div className="p-4 font-semibold font-sans">
              <p>
                {" "}
                <span className="text-black-500">
                  {showFullAIDINFO
                    ? offer.AIDINFO
                    : `${offer.AIDINFO.substring(0, 85)}...`}
                </span>{" "}
                <button
                  className="text-white bg-blue-500 px-4 py-2 rounded-md ml-2 text-sm"
                  onClick={toggleAIDINFO}
                >
                  {showFullAIDINFO ? "Less" : "More"}
                </button>
              </p>
    
              {/* container for Amount */}
              {showAmountInEther && (
          <div className="bg-blue-100 p-4 rounded mt-4 flex justify-center items-center">
            <p style={{ fontSize: "20px" }}>Amount In Ether: {offer.AMOUNT}</p>
          </div>
        )}

              {/* Combined container for proposals and accepted */}
          <div className="rounded mt-4 flex justify-center items-center">
            <p className="mr-20" style={{ fontSize: "20px" }}>Proposals: {offer.PROPOSALS}</p>
            <p className="ml-20" style={{ fontSize: "20px" }}>Accepted: {offer.ACCEPTED}</p>
          </div>
    
              {/* Combined container for Donee AIDNAME, Country, and Phone Number with icons */}
              <div className="rounded mt-4 flex justify-center items-center">
                <Person className="mr-1" /> <p className="mr-6">{offer.DONORNAME}</p>
                <Public className="mx-1" /> <p className="mx-">{offer.COUNTRY}</p>
                <Phone className="ml-10" /> <p className="ml">{offer.PHONENUMBER}</p>
              </div>
            </div>
          </div>
          
        </div>
      );
    }
    