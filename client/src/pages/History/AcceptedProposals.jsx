import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import DonateBox from "../../component/AidOfferBox";
import { useAuth } from "../../contextAPI/AuthContext";
import { useEthereum } from "../../contextAPI/EthereumContext";
import axios from "axios";
import { _fetchData } from "ethers/lib/utils";

function AcceptedProposals() {
  const itemsPerRow = 1;
  const maxRows = 4;
  const { state } = useEthereum();
  const [currentPage, setCurrentPage] = useState(0);
  const [fundOffers, setFundOffers] = useState([]);
  const { currentToken, accountAddress } = useAuth();
  const [flagFilter, setFlagFilter] = useState(null);
  const [donationSummary, setDonationSummary] = useState([]);
  
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
        console.log("The transactions",transactions);
        const donorTransaction = transactions.filter(
          (transaction) =>{ 
          if (transaction.donor == accountAddress)
          {
            return transaction;
          }}
        );
        donorTransaction.reverse();
        console.log("User Transaction",donorTransaction);
        sumOfDonorTransactions(donorTransaction);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const sumOfDonorTransactions = (donorTransaction) => {
    const summary = donorTransaction.reduce((acc, transaction) => {
      const existingTransaction = acc.find((item) => item.tId === transaction.tId);
      if (existingTransaction) {
        existingTransaction.amount += parseFloat(transaction.amount);
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
      const body ={
        events: donationSummary
      }
      console.log(body)
      const response = await axios.post(
        "http://localhost:5000/api/aidRequst/donor-list",body,
        {
          headers: {
            authorization: currentToken,
          },
        }
      );
      if (response.status === 200) {
        console.log("The response : ", response.data);
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

  return <div>Hello World</div>;
}

export default AcceptedProposals;