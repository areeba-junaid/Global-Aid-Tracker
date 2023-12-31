import React, { useState } from "react";
import AcceptedProposalBox from "./AcceptedProposalBox";
import Offer from "../../data/DonationOffer";

function AcceptedProposals() {
  const itemsPerRow = 1;
  const maxRows = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState(null);
  const [optionFilter, setOptionFilter] = useState(null); // New state for option

  const startIndex = currentPage * itemsPerRow * maxRows;
  const endIndex = startIndex + itemsPerRow * maxRows;

  const displayedOffers = Offer.slice(startIndex, endIndex).filter(
    (offer) =>
      (statusFilter === null ||
        (statusFilter === "active" && offer.fundedinether > 0) ||
        (statusFilter === "inactive" && offer.fundedinether === 0)) &&
      (optionFilter === null ||
        (optionFilter === "open" && offer.flag === true) ||
        (optionFilter === "close" && offer.flag === false))
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

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleOptionChange = (option) => {
    setOptionFilter(option);
  };

  return (
    <div className="w-5/6 mt-10 p-4 m-auto">
      <h1 className="text-3xl font-semibold text-center">Accepted Proposals</h1>
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

          {/* Status Filter Radio Buttons */}
          <div className="mb-4">
            <label className="text-lg font-bold mr-4">
              Status:
              </label>
              <label className="text-lg mr-2">
              <input
                type="radio"
                name="statusFilter"
                value="active"
                checked={statusFilter === "active"}
                onChange={() => handleStatusChange("active")}
                className="mr-1 h-4 w-6"
              />
              Active
            </label>
            <label className="text-lg">
              <input
                type="radio"
                name="statusFilter"
                value="inactive"
                checked={statusFilter === "inactive"}
                onChange={() => handleStatusChange("inactive")}
                className="mr-1 h-4 w-6"
              />
              Inactive
            </label>
          </div>

          {/* Option Filter Radio Buttons */}
          <div className="mb-4">
            <label className="text-lg font-bold mr-4">
              Filter:
              </label>
              <label className = "text-lg mr-2">
              <input
                type="radio"
                name="optionFilter"
                value="open"
                checked={optionFilter === "open"}
                onChange={() => handleOptionChange("open")}
                className="mr-1 h-4 w-6"
              />
              Open
            </label>
            <label className="text-lg">
              <input
                type="radio"
                name="optionFilter"
                value="close"
                checked={optionFilter === "close"}
                onChange={() => handleOptionChange("close")}
                className="mr-1 h-4 w-6"
              />
              Close
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
            {displayedOffers.map((offer, index) => (
              <div key={index} className="flex justify-center flex-col">
                <AcceptedProposalBox offer={offer} showTargetAndFunded={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AcceptedProposals;
