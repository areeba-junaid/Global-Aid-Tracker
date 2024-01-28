import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { ethers } from "ethers";
import DonationRecord from "./DonationRecord";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contextAPI/AuthContext";
import aidStyles from "../../utils/aidStyles";
import { useEthereum } from "../../contextAPI/EthereumContext";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobe,
  faPhone,
  faClock,
  faMessage,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

const AidRequestDetail = () => {
  const [formData, setFormData] = useState({});
  const { tId } = useParams();
  const [total,setTotal]=useState(null);
  const [donated,setdonated]=useState(null);
  const { currentToken, accountAddress,accountType } = useAuth();
  const { state } = useEthereum();
  const [record, setRecord] = useState([]);
     const readTotal=async()=>{
     try{ 
      const total=await state.contractRead.getCollectedFundInfo(tId);
      console.log(total);
      const totalEthers = ethers.utils.formatEther(total.toNumber());
      setTotal(totalEthers);}
      catch(error){
        console.log("error reading total amount", error);
      }
    }
    const donorTotal = () => {
      try {
        const totalWei = record.reduce((acc, item) => {
          if (item.donor === accountAddress) {
            return BigInt(item.amount * 1e18) + acc;
          } else {
            return acc;
          }
        }, BigInt(0));
    
        const totalEther = parseFloat(totalWei) / 1e18;
        setdonated(totalEther);
        console.log("Total Donation for Donor: ", totalEther);
      } catch (error) {
        console.error("Error calculating donor total:", error);
      }
    };
    
    const updateFund = async () => {
      try {
        const  body={ tId, collectedAmount:total};
        const response = await axios.post(
          "http://localhost:5000/api/aidRequst/update-fund",
            body,
              {
                headers: {
                  authorization: currentToken,
                },
              }

        );
        if (response.status === 200) {
          console.log("The response : ", response.data);
          setFormData({ ...response.data });
        }
      } catch (error) {
        console.error("Error fetching aid detail:", error);
      }
    };
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
  const fetchTransactions = async () => {
    try {
      console.log(state);
      console.log(accountAddress);
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
        const userTransaction = transactions.filter(
          (transaction) =>{ 
          if (transaction.tId == tId)
          {
            return transaction;
          }}
        );
        console.log("User Transaction",userTransaction);
        const latestTransaction = userTransaction.reverse();
        setRecord(latestTransaction);
   
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const donateEthers = async (amountInput) => {
    try {
      const etherValue = ethers.utils.parseEther(amountInput);
      const currentDate = new Date();
      const currentTimeInSeconds = Math.floor(currentDate.getTime() / 1000);
      const tx = await state.contractWrite.AidRequestRecieved(
        formData.tId,
        formData.donee.accountNo,
        currentTimeInSeconds,
        {
          value: etherValue,
        }
      );
      alert("Thankyou for Donating!!!");
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        fetchTransactions();
        readTotal();
      } 
      
    } catch (error) {
      console.error("Error sending donation:", error);
      if (error.code === -32000) {
        
        alert("Insufficient Funds in your MetaMask wallet.");
      } else {
      
        alert("Transaction is cancelled due to Error");
      }
      return null;
    }
  };

  const handleSendButton = async (e) => {
    e.preventDefault();
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      if(accountAddress!==account)
      {
         alert("Please do Transaction with your Valid Account");
         return;
      }
      if (!formData) {
        alert("Aid Request Does not Exist ");
        return;
      }
      const amountInput = document.getElementById("etherAmount").value;
      if (!amountInput || amountInput <= 0) {
        alert(" Please Enter Valid Number");
        return;
      }
       await donateEthers(amountInput);
    } catch (error) {
      console.error("Error sending donation:", error);
    
    }
  };
  const fetchData = async () => {
    try {
      console.log(currentToken);
      console.log(tId);
      const response = await axios.get(
        "http://localhost:5000/api/aidRequst/get-aid-detail",
        {
          headers: {
            authorization: currentToken,
          },
          params: { tId },
        }
      );
      if (response.status === 200) {
        setFormData({ ...response.data });
        console.log("The response : ", response.data);
      }
    } catch (error) {
      console.error("Error fetching aid detail:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchTransactions();
    readTotal();
   
    console.log(record);
  }, [tId, state]);

  useEffect(() => {
    console.log(total);
    updateFund();
 
  }, [total]);

  useEffect(() => {
    
    donorTotal();
  }, [record]);

  return (
    <div className="container w-max-8 mx-auto mb-10 p-3 rounded shadow ">
      <div className="flex">
        <div className="flex-1 bg-gray-200 w-2/5 px-6 py-3 rounded border flex flex-col ">
          <div className="flex flex-row justify-between rounded-md mb-3 px-4 py-4  ">
            <h2 className="text-4xl">
              {aidStyles[formData.aidType]?.icon} {formData.aidName}
            </h2>
            <h2 className="text-xl ">
              <FontAwesomeIcon icon={faClock} /> {formData.createdAt}
            </h2>
          </div>
           <div className="bg-white">
          <div className=" rounded-md px-4 py-4 mb-2">
            <p className="p-1 mb-5">
              <strong className="text-2xl ">Aid Information: </strong>
              {formData.aidInfo}
            </p>

            <h2>
              <strong>Funds Required:</strong> {formData.targetAmount} ethers{" "}
            </h2>
            <h2>
              <strong>Funds Collected:</strong> {total? total :0 } ethers{" "}
            </h2>
          </div>

          <div className="flex flex-row justify-around p-3">
            <h1>
              <strong>Aid Type:</strong> {formData.aidType}
            </h1>
            <h1>
              <strong>Aid Category:</strong> Fund
            </h1>
            <h1>
              <strong>Aid Status:</strong> {formData.status}
            </h1>
          </div>

          {donated!=null && accountType==='donor' && (<div className="flex flex-row justify-around p-3 font-bold bg-blue-500">
            <h1>
              You Donated:  {donated} ethers
            </h1>
           
          </div>)}
          </div>

          {formData?.status==="open"&& accountType==='donor' && (
            <form className=" mt-4 flex flex-col " onSubmit={handleSendButton}>
              <input
                id="etherAmount"
                className="rounded shadow self-center text-black p-2 w-4/12 mt-5 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                step="0.000001"
                required
                placeholder="Enter amount in Ethers"
              />
              <button
                className="bg-green-700  hover:bg-green-600 rounded shadow self-center text-white p-2 w-4/12 mt-5"
                type="submit"
                
              >
                Send Donation
              </button>
            </form>
          )}
          {formData?.status==='closed' && (
            <p  className="m-auto font-bold text-green-600 text-xl">Congratulations Target Amount has bee collected , Thanks to all Donors!!!</p>
          )}
        </div>

        <div className="flex-2 bg-blue-300 w-1/3  p-10 flex flex-col  rounded ">
          <h2 className="self-center font-bold text-2xl py-6">
            DONEE INFORMATION
          </h2>

          {formData.donee ? (
            <div className="flex flex-col bg-white rounded p-6">
              <h1 className="p-2">
                <FontAwesomeIcon icon={faUser} />
                <strong> Name: </strong> {formData.donee.name}
              </h1>
              <h1 className="p-2">
                <FontAwesomeIcon icon={faGlobe} />
                <strong> Country: </strong> {formData.donee.country}
              </h1>
              <h1 className="p-2">
                <FontAwesomeIcon icon={faPhone} />
                <strong> Phone No:</strong> {formData.donee.phone}
              </h1>
              <h1 className="p-2">
                <FontAwesomeIcon icon={faMessage} /> <strong> Email:</strong>{" "}
                {formData.donee.email}
              </h1>
              <h1 className="p-2">
                <FontAwesomeIcon icon={faPerson} /> <strong> User Type:</strong>{" "}
                {formData.donee.userType}
              </h1>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <DonationRecord record={record} />
      </div>
    </div>
  );
};

export default AidRequestDetail;
