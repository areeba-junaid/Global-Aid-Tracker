import React, { useState } from "react";
import DonateBox from "../../component/DonateBox";
import Offer from "../../data/DonationOffer";
import CustomButton from "../../component/CustomButton"; 

function DonationsLists() {
  const itemsPerRow = 1; //  row per column
  const maxRows = 4; // Max rows 
  const [currentPage, setCurrentPage] = useState(0);
  const [aidFormFilter, setAidFormFilter] = useState(null);


  //  starting and ending indices for the displayed offers
  const startIndex = currentPage * itemsPerRow * maxRows;
  const endIndex = startIndex + itemsPerRow * maxRows;

  // Slicing  offer array to get the offers to display 
  const displayedOffers = Offer.slice(startIndex, endIndex).filter(
    (offer) =>
      aidFormFilter === null ||
      (aidFormFilter === "fund" && offer.aidform === "Funds") ||
      (aidFormFilter === "asset" && offer.aidform === "Assets")
  );


  //  "Next" button click
  const handleNextPage = () => {
    if ((currentPage + 1) * maxRows * itemsPerRow < Offer.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  //  "Previous" button click
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAidFormChange = (form) => {
    setAidFormFilter(form);
  };

  return (
    <div className="w-5/6 mt-10 p-4 m-auto ">
      <h1 className="text-3xl font-semibold text-center">Aid Requests</h1>
      <hr className="mt-4" />

      {displayedOffers.length > 0 && (
        <div >
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
        <label className="text-lg">
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

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
            {displayedOffers.map((offer, index) => (
              <div key={index} className="flex justify-center flex-col">
                <DonateBox offer={offer} showTargetAndFunded={aidFormFilter !== "asset"}/>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DonationsLists;
