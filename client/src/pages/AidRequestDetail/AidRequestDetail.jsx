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
  const { currentToken, accountAddress } = useAuth();
  const { state } = useEthereum();
  const [record, setRecord] = useState([]);
     const readTotal=async()=>{
     try{ 
      const total=await state.contractRead.getCollectedFundInfo(tId);
      const totalEthers = ethers.utils.formatEther(total.toNumber());
      setTotal(totalEthers);}
      catch(error){
        console.log("error reading total amount");
      }
    }
    const updateFund = async () => {
      try {
        const  body={ tId, collectedAmount:  0.00001};
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
        return 1;
      } else {
        alert("Transaction Failed due to Error");
        console.error("Transaction failed or was reverted");
        return null;
      }
    } catch (error) {
      console.error("Error sending donation:", error);
      if (error.code === -32000) {
        
        alert("Insufficient Funds in your MetaMask wallet.");
      } else {
      
        alert("An error occurred while processing your donation.");
      }
      return null;
    }
  };

  const handleSendButton = async (e) => {
    try {
      if (!formData) {
        alert("Aid Request Does not Exist ");
        return;
      }
      const amountInput = document.getElementById("etherAmount").value;
      if (!amountInput || amountInput <= 0) {
        alert(" Please Enter Valid Number");
        return;
      }
        const Data = await donateEthers(amountInput);
         if (Data ===1) {
         await readTotal();
        updateFund();

     }
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

  return (
    <div className="container w-max-8 mx-auto mb-10 p-3 rounded shadow ">
      <div className="flex">
        <div className="flex-1 bg-gray-200 w-2/5 px-6 py-3 rounded border flex flex-col ">
          <div className="flex flex-row justify-between rounded-md mb-3 px-4 py-4  ">
            <h2 className="text-4xl">
              {aidStyles[formData.aidType]?.icon} {formData.aidName}
            </h2>
            <h2 className="text-2xl ">
              <FontAwesomeIcon icon={faClock} />{formData.createdAt}
            </h2>
          </div>

          <div className=" bg-white rounded-md px-4 py-4 mb-5">
            <p className="p-1 mb-5">
              <strong className="text-2xl ">Aid Information: </strong>
              {formData.aidInfo}
            </p>

            <h2>
              <strong>Funds Required:</strong> {formData.targetAmount} ethers{" "}
            </h2>
            <h2>
              <strong>Funds Collected:</strong> {total>0? total :0 } ethers{" "}
            </h2>
          </div>

          <div className="bg-white rounded flex flex-row justify-around p-3">
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

          {formData.donee && formData.donee.accountNo != accountAddress && formData.status==="open"? (
            <div className=" mt-4 flex flex-col ">
              <input
                id="etherAmount"
                className="rounded shadow self-center text-black p-2 w-4/12 mt-5 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                placeholder="Enter amount in Ethers"
              />
              <button
                className="bg-green-700  hover:bg-green-600 rounded shadow self-center text-white p-2 w-4/12 mt-5"
                type="submit"
                onClick={handleSendButton}
              >
                Send Donation
              </button>
            </div>
          ) : (
            <p className="m-auto font-bold text-green-600 text-xl">Congratulations Target Amount has bee collected , Thanks to all Donors!!!</p>
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
