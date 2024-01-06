import React, { useState } from "react";
import aidStyles from "../utils/aidStyles";
import { useNavigate } from "react-router-dom";
import { Person, Public, Phone } from "@mui/icons-material";

export default function AidOfferBox({ offer }) {
  const [showFullAIDINFO, setShowFullAIDINFO] = useState(false);
  const navigate = useNavigate();
  const toggleAIDINFO = () => {
    setShowFullAIDINFO(!showFullAIDINFO);
  };

  return (
    <div
      className="w-3/4 flex flex-col justify-center items-center mx-auto hover:bg-slate-100 "
      onClick={() => {
        navigate(`/aid-offer-detail/${offer.tId}`);
      }}
    >
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

          <div className="bg-blue-200 p-4 rounded mt-4 flex justify-center items-center">
            <p style={{ fontSize: "20px" }}>Amount In Ether: {offer.amount}</p>
          </div>

          {/* Combined container for proposals and accepted */}
          <div className="rounded mt-4 flex justify-center items-center">
            <p className="mr-20" style={{ fontSize: "20px" }}>
              Proposals: {offer.requestedBy.length}
            </p>
            <p className="ml-20" style={{ fontSize: "20px" }}>
              Accepted: {offer.acceptedDonee.length}
            </p>
          </div>

          {/* Combined container for Donee AIDNAME, Country, and Phone Number with icons */}
          <div className="rounded mt-4 flex justify-center items-center">
            <Person className="mr-1" />{" "}
            <p className="mr-6">{offer.donor.name}</p>
            <Public className="mx-1" />{" "}
            <p className="mx-">{offer.donor.country}</p>
            <Phone className="ml-10" />{" "}
            <p className="ml">{offer.donor.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
