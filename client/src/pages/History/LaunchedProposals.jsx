import React, { useState } from "react";
import Offer from "../../data/DonationOffer";
import CustomButton from "../../component/CustomButton";
import LaunchedProposalsBox from "./LaunchedProposalsBox";

function LaunchedProposals() {
  const itemsPerRow = 1;
  const maxRows = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [aidFormFilter, setAidFormFilter] = useState(null);
  const [fundedFilter, setFundedFilter] = useState(null);
  const [flagFilter, setFlagFilter] = useState(null); // New state for flag filter

  const startIndex = currentPage * itemsPerRow * maxRows;
  const endIndex = startIndex + itemsPerRow * maxRows;

  const displayedOffers = Offer.slice(startIndex, endIndex).filter(
    (offer) =>
      (aidFormFilter === null ||
        (aidFormFilter === "fund" && offer.aidform === "Funds") ||
        (aidFormFilter === "asset" && offer.aidform === "Assets")) &&
      (fundedFilter === null ||
        (fundedFilter === "open" && offer.fundedinether > 0) ||
        (fundedFilter === "close" && offer.fundedinether === 0)) &&
      (flagFilter === null ||
        (flagFilter === "active" && offer.flag) ||
        (flagFilter === "inactive" && !offer.flag))
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * maxRows * itemsPerRow < Offer.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAidFormChange = (form) => {
    setAidFormFilter(form);
  };

  const handleFundedChange = (fundedOption) => {
    setFundedFilter(fundedOption);
  };

  const handleFlagChange = (flagOption) => {
    setFlagFilter(flagOption);
  };

  return (
    <div className="w-5/6 mt-10 p-4 m-auto">
      <h1 className="text-3xl font-semibold text-center">Launched Proposals</h1>
      <hr className="mt-4" />

      {displayedOffers.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevPage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>

          {/* Aid Form Filter Radio Buttons */}
          <div className="mb-4">
          <label className="text-lg font-bold mr-4">
          Type:
        </label>
            <label className="text-lg mr-2">
              <input
                type="radio"
                name="aidFormFilter"
                value="fund"
                checked={aidFormFilter === "fund"}
                onChange={() => handleAidFormChange("fund")}
                className="mr-2 h-4 w-6"
              />
              Fund
            </label>
            <label className="ml-4 text-lg">
              <input
                type="radio"
                name="aidFormFilter"
                value="asset"
                checked={aidFormFilter === "asset"}
                onChange={() => handleAidFormChange("asset")}
                className="mr-2 h-4 w-6"
              />
              Asset
            </label>
          </div>

          {/* Funded Filter Radio Buttons */}
          <div className="mb-4">
          <label className="text-lg font-bold mr-4">
          Filter:
        </label>
            <label className="text-lg mr-2">
              <input
                type="radio"
                name="fundedFilter"
                value="open"
                checked={fundedFilter === "open"}
                onChange={() => handleFundedChange("open")}
                className="mr-1 h-4 w-6"
              />
              Open
            </label>
            <label className="ml-4 text-lg">
              <input
                type="radio"
                name="fundedFilter"
                value="close"
                checked={fundedFilter === "close"}
                onChange={() => handleFundedChange("close")}
                className="mr-2 h-4 w-6"
              />
              Close
            </label>
          </div>

          {/* Flag Filter Radio Buttons */}
          <div className="mb-4">
          <label className="text-lg font-bold mr-4">
          Status:
        </label>
            <label className="text-lg mr-2">
              <input
                type="radio"
                name="flagFilter"
                value="active"
                checked={flagFilter === "active"}
                onChange={() => handleFlagChange("active")}
                className="mr-1 h-4 w-6"
              />
              Active
            </label>
            <label className="ml-4 text-lg">
              <input
                type="radio"
                name="flagFilter"
                value="inactive"
                checked={flagFilter === "inactive"}
                onChange={() => handleFlagChange("inactive")}
                className="mr-1 h-4 w-6"
              />
              Inactive
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {displayedOffers.map((offer, index) => (
              <div key={index} className="flex justify-center flex-col">
                <LaunchedProposalsBox offer={offer} showTargetAndFunded={aidFormFilter !== "asset"} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LaunchedProposals;
