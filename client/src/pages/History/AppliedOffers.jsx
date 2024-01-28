import React, { useState, useEffect } from "react";
import AidOfferBox from "../../component/AidOfferBox";
import AssetOfferBox from "../../component/AssetOfferBox";
import { useAuth } from "../../contextAPI/AuthContext";
import axios from "axios";

function AidOfferList() {
  const itemsPerRow = 1;
  const maxRows = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [aidFormFilter, setAidFormFilter] = useState("accept");
  const [flagFilter, setFlagFilter] = useState(null);
  const [acceptOffers, setAcceptOffers] = useState([]);
  const [requestOffers, setRequestOffers] = useState([]);
  const { currentToken, accountAddress } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "";

        if (aidFormFilter === "accept") {
          apiUrl = `http://localhost:5000/api/aidOffer/donee-accepted-offer-list/${accountAddress}`;
        } else if (aidFormFilter === "request") {
          apiUrl = `http://localhost:5000/api/aidOffer/donee-requested-offer-list/${accountAddress}`;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            authorization: currentToken,
          },
        });

        if (response.status === 200) {
          response.data.reverse();
          if (aidFormFilter === "accept") {
            setAcceptOffers(response.data);
            console.log(response.data);
          } else {
            setRequestOffers(response.data);
            console.log(response.data);
          }
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchData();
  }, [aidFormFilter]);

  let Offer = aidFormFilter === "accept" ? acceptOffers : requestOffers;
  const startIndex = currentPage * itemsPerRow * maxRows;
  const endIndex = startIndex + itemsPerRow * maxRows;
  Offer = Offer.filter((offer) => {
    const statusCondition =
      flagFilter === null ||
      (flagFilter === "open" && offer.status === "open") ||
      (flagFilter === "closed" && offer.status === "closed");
    return statusCondition;
  });
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
    setFlagFilter(null);
    setCurrentPage(0);
  };

  const handleFlagChange = (flagOption) => {
    setFlagFilter(flagOption);
    setCurrentPage(0);
  };
  console.log(flagFilter, aidFormFilter, Offer);
  return (
    <div className="w-5/6 mt-10 p-4 m-auto">
      <h1 className="text-3xl font-semibold text-center">Applied Offers</h1>
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
        <label className="text-lg font-bold mr-4">Offer:</label>
        <label className="text-lg mr-2">
          <input
            type="radio"
            name="aidFormFilter"
            value="accept"
            checked={aidFormFilter === "accept"}
            onChange={() => handleAidFormChange("accept")}
            className="mr-2 h-4 w-6"
          />
          Accepted
        </label>
        <label className="ml-4 text-lg">
          <input
            type="radio"
            name="aidFormFilter"
            value="request"
            checked={aidFormFilter === "request"}
            onChange={() => handleAidFormChange("request")}
            className="mr-2 h-4 w-6"
          />
          Requested
        </label>
      </div>

      {/* Flag Filter Radio Buttons */}
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
            className="mr-1 h-4 w-6"
          />
          Close
        </label>
      </div>
      {Offer.length != 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
          {displayedOffers.map((offer, index) => (
            <div key={index} className="flex justify-center flex-col">
              <AidOfferBox offer={offer} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
        <p className="text-2xl font-bold mb-7">No Offers To Show</p>
      </div>
      )}
    </div>
  );
}

export default AidOfferList;
