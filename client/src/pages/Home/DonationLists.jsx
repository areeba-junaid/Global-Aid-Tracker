import React, { useState, useEffect } from "react";
import DonateBox from "../../component/DonateBox";
import AssetOfferBox from "../../component/AssetOfferBox";

import { useAuth } from "../../contextAPI/AuthContext";
import axios from "axios";

function DonationList() {
  const itemsPerRow = 1;
  const maxRows = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [aidFormFilter, setAidFormFilter] = useState("fund");
  const [fundOffers, setFundOffers] = useState([]);
  const [assetOffers, setAssetOffers] = useState([]);
  const { currentToken } = useAuth();

  // Fetch offers based on aidFormFilter
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";

        if (aidFormFilter === "asset") {
          apiUrl = "http://localhost:5000/api/assetOffer/all-donee-asset-list";
        } else if (aidFormFilter === "fund") {
          apiUrl = "http://localhost:5000/api/aidRequst/all";
        }

        const response = await axios.get(apiUrl, {
          headers: {
            authorization: currentToken,
          },
        });

        if (response.status === 200) {
          if (aidFormFilter === "fund") {
            response.data.reverse();
            setFundOffers(response.data);
            console.log(response.data)
         
          } else {
            setAssetOffers(response.data);
        
          }
        }
      } catch (error) {
        // Handle error
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [aidFormFilter]);

  const startIndex = currentPage * itemsPerRow * maxRows;
  const endIndex = startIndex + itemsPerRow * maxRows;
  const Offer = aidFormFilter === "fund" ? fundOffers : assetOffers;
  console.log("The offer state: " , Offer);
  const displayedOffers = Offer.slice(startIndex, endIndex);

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
    setCurrentPage(0);
  };

  return (
    <div className="w-5/6 mt-10 p-4 m-auto ">
      <h1 className="text-3xl font-semibold text-center">Aid Requests</h1>
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

      {/* Displayed Offer Boxes */}
      {aidFormFilter === "fund" && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
          {displayedOffers.map((offer, index) => (
            <div key={index} className="flex justify-center flex-col">
             <DonateBox offer={offer} />
            </div>
          ))}
        </div>
      )}

      {aidFormFilter === "asset" && (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
          {displayedOffers.map((offer, index) => (
            <div key={index} className="flex justify-center flex-col">
              <AssetOfferBox offer={offer} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default  DonationList;
