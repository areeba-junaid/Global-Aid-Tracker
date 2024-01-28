import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import DonateBox from "../../component/DonateBox";
import { useAuth } from "../../contextAPI/AuthContext";
import { useEthereum } from "../../contextAPI/EthereumContext";
import axios from "axios";
import { _fetchData } from "ethers/lib/utils";

function AcceptedProposals() {
  const itemsPerRow = 1;
  const maxRows = 4;
  const { state } = useEthereum();
  const [currentPage, setCurrentPage] = useState(0);
  const { currentToken, accountAddress } = useAuth();
  const [flagFilter, setFlagFilter] = useState("all");
  const [donationSummary, setDonationSummary] = useState([]);
  const [record, allRecord] = useState([]);

  const getCurrentTimeFormatted = (time) => {
    const formattedDate = new Date(time * 1000).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedDate;
  };
  const blockchainRecord = async () => {
    try {
      if (state.contractRead != null) {
        const events = await state.contractRead.queryFilter(
          "aidRequestTransaction"
        );
        const transactions = events.map((event) => ({
          donor: event.args.donor,
          donee: event.args.donee,
          tId: event.args.tId.toNumber(),
          amount: ethers.utils.formatEther(event.args.amount),
          timestamp: getCurrentTimeFormatted(event.args.time.toNumber()),
        }));
        console.log("The transactions", transactions);
        const donorTransaction = transactions.filter((transaction) => {
          if (transaction.donor == accountAddress) {
            return transaction;
          }
        });
        donorTransaction.reverse();
        console.log("User Transaction", donorTransaction);
        sumOfDonorTransactions(donorTransaction);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const sumOfDonorTransactions = (donorTransaction) => {
    const summary = donorTransaction.reduce((acc, transaction) => {
      const existingTransaction = acc.find(
        (item) => item.tId === transaction.tId
      );
      if (existingTransaction) {
        existingTransaction.amount = existingTransaction.amount+ parseFloat(transaction.amount);
      } else {
        acc.push({
          tId: transaction.tId,
          timestamp: transaction.timestamp,
          amount: parseFloat(transaction.amount),
        });
      }
      return acc;
    }, []);
    setDonationSummary(summary);
  };

  const fetchData = async () => {
    try {
      console.log(currentToken);
      const body = {
        events: donationSummary,
      };
      console.log(body);
      const response = await axios.post(
        "http://localhost:5000/api/aidRequst/donor-list",
        body,
        {
          headers: {
            authorization: currentToken,
          },
        }
      );
      if (response.status === 200) {
        console.log("The response : ", response.data);
        allRecord(response.data);
      }
    } catch (error) {
      console.error("Error fetching aid detail:", error);
    }
  };

  const donorHistory = async () => {
    await blockchainRecord();
  };

  useEffect(() => {
    donorHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (donationSummary.length > 0) {
      fetchData();
    }
  }, [donationSummary]);
  const startIndex = currentPage * itemsPerRow * maxRows;
  const endIndex = startIndex + itemsPerRow * maxRows;
  let Offer = record.filter((aid) => {
    const statusCondition =
      flagFilter === "all" ||
      (flagFilter === "open" && aid.status === "open") ||
      (flagFilter === "closed" && aid.status === "closed");

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

  const handleFlagChange = (flagOption) => {
    setFlagFilter(flagOption);
    setCurrentPage(0);
  };

  return (
    <div className="w-5/6 mt-10 p-4 m-auto">
      <h1 className="text-3xl font-semibold text-center">
        Accepted Aid Request
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

        {/* Funded Filter Radio Buttons */}
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
          <label className="ml-4 text-lg">
            <input
              type="radio"
              name="flagFilter"
              value="all"
              checked={flagFilter === "all"}
              onChange={() => handleFlagChange("closed")}
              className="mr-2 h-4 w-6"
            />
            All
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
          {displayedOffers.map((offer, index) => (
            <div key={index} className="flex justify-center flex-col ">
              <DonateBox offer={offer} />
            <div className="bg-gray-100  w-3/4 flex flex-row justify-around  items-center mx-auto p-2 border-2 border-black px-3">

               <p >Donation :  {offer.donorDonation?.toFixed(6)}</p> 
               <p >Time :  {offer.donortimestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {Offer?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl font-bold mb-7">No Fund Offers To Show</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AcceptedProposals;
