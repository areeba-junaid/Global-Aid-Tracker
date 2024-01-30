import React, { useState } from "react";
import aidStyles from "../utils/aidStyles";
import { Person, Public, Phone } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
export default function AssetOfferBox({ offer }) {
 
  const [showFullAIDINFO, setShowFullAIDINFO] = useState(false);

  const toggleAIDINFO = () => {
    setShowFullAIDINFO(!showFullAIDINFO);
  };

  return (
    <div
      className="w-3/4 flex flex-col justify-center items-center mx-auto  "
    >
      <div className="border border-gray-500 rounded w-full max-w-md-40">
        <div
          className="hover:bg flex flex-row justify-between items-baseline w-full text-3xl space-x-7 p-2 "
          style={{ backgroundColor: aidStyles[offer.aidType].color }}
        >
          <Link
            to={`/asset-detail/${offer.tId}`}
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

          {offer.accountInfo ? (
            <div className="rounded mt-4 flex justify-center items-center">
              <Person className="mr-1" />{" "}
              <p className="mr-6">{offer.accountInfo[0].name}</p>
              <Public className="mx-1" />{" "}
              <p className="mx-">{offer.accountInfo[0].country}</p>
              <Phone className="ml-10" />{" "}
              <p className="ml">{offer.accountInfo[0].phone}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
