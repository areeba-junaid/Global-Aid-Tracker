import React, { useState } from "react";
import DonateBox from "../../component/DonateBox";
import Offer from "../../data/DonationOffer";
import CustomButton from "../../component/CustomButton"; 

function DonationsLists() {
  const itemsPerRow = 2; //  row per column
  const maxRows = 3; // Max rows 
  const [currentPage, setCurrentPage] = useState(0);

  //  starting and ending indices for the displayed offers
  const startIndex = currentPage * itemsPerRow * maxRows;
  const endIndex = startIndex + itemsPerRow * maxRows;

  // Slicing  offer array to get the offers to display 
  const displayedOffers = Offer.slice(startIndex, endIndex);

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

  return (
    <div className="w-5/6 mt-10 p-4 m-auto">
      <h1 className="text-3xl font-semibold text-center">Donation Lists</h1>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {displayedOffers.map((offer, index) => (
              <div key={index} className="flex justify-center flex-col">
                <DonateBox offer={offer} />
                <CustomButton text={`Request ${offer.request}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DonationsLists;
