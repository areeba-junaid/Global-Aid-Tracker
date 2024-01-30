import React, { useState, useEffect } from "react";
import DonateBox from "../../component/DonateBox";
import AssetOfferBox from "../../component/AssetOfferBox";
import { useAuth } from "../../contextAPI/AuthContext";
import axios from "axios";

function LaunchedProposals() {
  const itemsPerRow = 1;
  const maxRows = 4;

  const [currentPage, setCurrentPage] = useState(0);
  const [aidFormFilter, setAidFormFilter] = useState("fund");
  const [fundOffers, setFundOffers] = useState([]);
  const [assetOffers, setAssetOffers] = useState([]);
  const { currentToken, accountAddress } = useAuth();
  const [fundedFilter, setFundedFilter] = useState(null);
  const [flagFilter, setFlagFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";

        if (aidFormFilter === "asset") {
          apiUrl = `http://localhost:5000/api/assetOffer/user-list/${accountAddress}`;
        } else if (aidFormFilter === "fund") {
          apiUrl = `http://localhost:5000/api/aidRequst/donee-list/${accountAddress}`;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            authorization: currentToken,
          },
        });

        if (response.status === 200) {
          response.data.reverse();
          if (aidFormFilter === "fund") {
            setFundOffers(response.data);
            console.log(response.data);
          } else {
            setAssetOffers(response.data);
            console.log(response.data);
          }
        }
      } catch (error) {
        // Handle error
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [aidFormFilter]);

  let Offer = aidFormFilter === "fund" ? fundOffers : assetOffers;
  const startIndex = currentPage * itemsPerRow * maxRows;
  const endIndex = startIndex + itemsPerRow * maxRows;
  Offer = Offer.filter((offer) => {
    const statusCondition =
      flagFilter === null ||
      (flagFilter === "open" && offer.status === "open") ||
      (flagFilter === "closed" && offer.status === "closed");

    const fundCondition =
      fundedFilter === null ||
      offer.collectedAmount === undefined ||
      (fundedFilter === "active" && offer.collectedAmount > 0) ||
      (fundedFilter === "inactive" && offer.collectedAmount === 0);

    return statusCondition && fundCondition;
  });
  const displayedOffers = Offer.slice(startIndex, endIndex);

  console.log(flagFilter, fundedFilter);
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
    setFundedFilter(null);
    setFlagFilter(null);
    setCurrentPage(0);
  };

  const handleFundedChange = (fundedOption) => {
    setFundedFilter(fundedOption);
    setCurrentPage(0);
  };

  const handleFlagChange = (flagOption) => {
    setFlagFilter(flagOption);
    setCurrentPage(0);
  };
  console.log("the filtered", Offer);
  return (
    <div className="w-5/6 mt-10 p-4 m-auto">
      <h1 className="text-3xl font-semibold text-center">
        Launched Aid Request
      </h1>
      <hr className="mt-4" />

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
          <label className="text-lg font-bold mr-4">Type:</label>
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

        {aidFormFilter === "fund" && (
        <div className="mb-4">
          <label className="text-lg font-bold mr-4">Status:</label>
          <label className="text-lg mr-2">
            <input
              type="radio"
              name="flagFilter"
              value="open"
              checked={flagFilter === "open"}
              onChange={() => handleFlagChange("open")}
              className="mr-1 h-4 w-6"
            />
            Open
          </label>
          <label className="ml-4 text-lg">
            <input
              type="radio"
              name="flagFilter"
              value="closed"
              checked={flagFilter === "closed"}
              onChange={() => handleFlagChange("closed")}
              className="mr-2 h-4 w-6"
            />
            Close
          </label>
        </div>)}

        {aidFormFilter === "fund" && (
          <div className="mb-4">
            <label className="text-lg font-bold mr-4">Funded:</label>
            <label className="text-lg mr-2">
              <input
                type="radio"
                name="fundedFilter"
                value="active"
                checked={fundedFilter === "active"}
                onChange={() => handleFundedChange("active")}
                className="mr-1 h-4 w-6"
              />
              Yes
            </label>
            <label className="ml-4 text-lg">
              <input
                type="radio"
                name="fundedFilter"
                value="inactive"
                checked={fundedFilter === "inactive"}
                onChange={() => handleFundedChange("inactive")}
                className="mr-1 h-4 w-6"
              />
              No
            </label>
          </div>
        )}

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
        {aidFormFilter === "fund" && Offer.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-bold mb-7">No Launched Fund Request to Show</p>
          </div>
        ) : null}
        {aidFormFilter === "asset" && Offer.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-bold mb-7">No Launched Asset Request to Show</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LaunchedProposals;
