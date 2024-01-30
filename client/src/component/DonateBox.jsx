import React, { useState } from "react";
import aidStyles from "../utils/aidStyles";
import { Link } from "react-router-dom";
import { Person, Public, Phone } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
export default function DonateBox({ offer }) {
  const [showFullAidInfo, setShowFullAidInfo] = useState(false);

  const toggleAidInfo = () => {
    setShowFullAidInfo(!showFullAidInfo);
  };

  return (
    <div className="w-3/4 flex flex-col justify-center items-center mx-auto">
      <div className="border border-gray-500 rounded w-full max-w-md-40">
        <div
          className="hover:bg flex flex-row justify-between items-baseline w-full text-3xl space-x-7 p-2 "
          style={{ backgroundColor: aidStyles[offer.aidType].color }}
        >
          <Link
            to={`/aid-request-detail/${offer.tId}`}
            className="text-black hover:text-gray-500"
          >
            <h3 className="">
              {aidStyles[offer.aidType].icon} {offer.aidName}
            </h3>
          </Link>
          <h2 className="text-xl ">
            <FontAwesomeIcon icon={faClock} /> {offer.createdAt}
          </h2>
        </div>
        <div className="p-4 font-semibold font-sans">
          <p>
            {" "}
            <span className="text-black-500">
              {showFullAidInfo
                ? offer.aidInfo
                : `${offer.aidInfo.substring(0, 90)}...`}
            </span>{" "}
            <button
              className="text-white bg-blue-500 px-4 py-2 rounded-md ml-2 text-sm"
              onClick={toggleAidInfo}
            >
              {showFullAidInfo ? "Less" : "More"}
            </button>
          </p>

          <div className="bg-gray-400 p-4 rounded mt-4 flex justify-around items-center px-2">
            <p className="text-xl">Target: {offer.targetAmount}</p>
            <p className="text-xl">Funded Amount: {offer.collectedAmount}</p>
          </div>

          {/* Combined container for Donee Name, Country, and Phone Number with icons */}
          {offer.donee.name ? (
            <div className="p-4 rounded mt-4 flex justify-center items-center">
              <Person className="mr-1" />{" "}
              <p className="mr-6">{offer.donee.name}</p>
              <Public className="mx-1" />{" "}
              <p className="mx-">{offer.donee.country}</p>
              <Phone className="ml-10" />{" "}
              <p className="ml">{offer.donee.phone}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
