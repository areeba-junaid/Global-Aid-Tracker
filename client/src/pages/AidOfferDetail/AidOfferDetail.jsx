import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "tailwindcss/tailwind.css";
import ListOfDonees from "./ListOfDonees";
import DonationRequestsAccepted from "./DonationRequestsAccepted";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contextAPI/AuthContext";
import { useEthereum } from "../../contextAPI/EthereumContext";
import aidStyles from "../../utils/aidStyles";
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

const AidOfferDetail = () => {
  const [formData, setFormData] = useState({});
  const { tId } = useParams();
  const { currentToken, accountAddress,accountType } = useAuth();
  const [userExist, setUserExist] = useState(false);
  const [total, setTotal]=useState(null);
  const { state } = useEthereum();
  const [isDonor , setIsDonor]=useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
    const body = {
      tId: tId,
      donee: accountAddress,
      proposal: event.target["proposal"].value,
    };

    alert("Thank you for reaching Out!!!");
    event.target["proposal"].value = "";
    doneeRequest(body);
  };

  const readTotal=async()=>{
    try{ 
     const total=await state.contractRead.getCollectedFundInfo(tId);
     const totalEthers = ethers.utils.formatEther(total.toNumber());
     setTotal(totalEthers);}
     catch(error){
       console.log("error reading total amount");
     }
   }
  const donateEthers = async (accountAddress) => {
    try {
      const amount=formData.amount.toString();
      const etherValue = ethers.utils.parseEther(amount);
      const currentDate = new Date();
      const currentTimeInSeconds = Math.floor(currentDate.getTime() / 1000);
      const tx = await state.contractWrite.DonorOfferSend(
        formData.tId,
        accountAddress,
        currentTimeInSeconds,
        {
          value: etherValue,
        }
      );
      alert("Thankyou for Donating!!!");
      const receipt = await tx.wait();
      if (receipt.status === 1) {
        readTotal();
        return 1;
      }
      return null;
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

  const doneeRequest = async (body) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/aidOffer/donee-request",
        body,
        {
          headers: {
            authorization: currentToken,
          },
        }
      );
      if (response.status === 200) {
        setFormData({ ...response.data });
        setUserExist(true);
        console.log("The response : ", response.data);
      }
    } catch (error) {
      console.error("Error fetching aid detail:", error);
    }
  };

  const handleAcceptRequest =async  (original) => {
    console.log("Accept the request", original);
    const body = {
      tId: tId,
      donee: original.accountAddress,
      proposal: original.proposal,
    };
    const Data = await donateEthers(original.accountAddress);
    console.log(Data);
    if(Data===1){
    donorAcceptRequest(body);}

  };
  const donorAcceptRequest = async (body) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/aidOffer/donor-accept",
        body,
        {
          headers: {
            authorization: currentToken,
          },
        }
      );
      if (response.status === 200) {
        setFormData({ ...response.data });
        console.log("The Accepted response : ", response.data);
      }
    } catch (error) {
      console.error("Error fetching aid detail:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/aidOffer/aid-offer-detail",
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
        const userExist = response.data.requestedBy.find((request) => {
          return request.donee.accountNo === accountAddress;
        });
        if (userExist) {
          setUserExist(true);
        }
        const  donor=response.data.donor.accountNo===accountAddress?true:false;
        console.log("the truth is here ",donor);
        setIsDonor(donor);

      }
    } catch (error) {
      console.error("Error fetching aid detail:", error);
    }
  };
  useEffect(() => {
    fetchData();
    readTotal()
  }, [tId, state]);

  return (
    <div className="container w-max-8 mx-auto mb-10 p-3 rounded shadow ">
      <div className="flex">
        <div className="flex-1 bg-gray-200 w-2/5 px-6 py-3 rounded border flex flex-col ">
          {userExist && (
            <h1 className=" text-black font-bold bg-slate-400 p-1 w-1/6  text-center rounded-md self-end ">
              Applied
            </h1>
          )}
          <div className="flex flex-row justify-between rounded-md mb-3 px-4 py-4  ">
            <h2 className="text-4xl">
              {aidStyles[formData?.aidType]?.icon} {formData?.aidName}
            </h2>
            <h2 className="text-2xl ">
              <FontAwesomeIcon icon={faClock} />
              {"  "}
              {formData?.createdAt}
            </h2>
          </div>

          <div className=" bg-white rounded-md px-4 py-4 mb-5">
            <p className="p-1 mb-5">
              <strong className="text-2xl ">Aid Information: </strong>
              {formData?.aidInfo}
            </p>

            <h2>
              <strong>Offer Amount:</strong> {formData?.amount} ethers{" "}
            </h2>
            <h2>
              <strong>Offer Opened To:</strong> {formData?.limit} Donees
            </h2>
          </div>

          <div className="bg-white rounded flex flex-row justify-around p-3">
            <h1>
              <strong>Aid Type:</strong> {formData?.aidType}
            </h1>
            <h1>
              <strong>Aid Category:</strong> Fund
            </h1>
            <h1>
              <strong>Aid Type:</strong> {formData[0]?.status}
            </h1>
          </div>

          {accountType!=="donor" &&
            formData?.status === "open" &&
            userExist === false && (
              <form onSubmit={submitHandler}>
                <div className=" mt-4 flex flex-col ">
                  <textarea
                    id="proposal"
                    placeholder="Write proposal to Apply"
                    className="p-4"
                    minLength="100"
                    maxLength="150"
                    required
                  />
                  <button
                    className="bg-green-700  hover:bg-green-600 rounded shadow self-center text-white p-2 w-4/12 mt-5"
                    type="submit"
                  >
                    Apply For Offer
                  </button>
                </div>
              </form>
            )}

          {formData?.status === "closed" ? (
            <p className=" p-1 m-auto text-red-600 font-bold text-xl w-full text-center">
              {" "}
              This Offer is closed Now
            </p>
          ) : (
            <p></p>
          )}
        </div>

        <div className="flex-2 bg-blue-300 w-2/5 p-10 flex flex-col  rounded ">
          <h2 className="self-center font-bold text-2xl p-1">
            DONOR INFORMATION
          </h2>

          {formData?.donor ? (
            <div className="flex flex-col bg-white rounded p-6">
              <h1 className="p-2">
                <FontAwesomeIcon icon={faUser} />
                <strong> Name: </strong> {formData?.donor.name}
              </h1>
              <h1 className="p-2">
                <FontAwesomeIcon icon={faGlobe} />
                <strong> Country: </strong> {formData?.donor.country}
              </h1>
              <h1 className="p-2">
                <FontAwesomeIcon icon={faPhone} />
                <strong> Phone No:</strong> {formData?.donor.phone}
              </h1>
              <h1 className="p-2">
                <FontAwesomeIcon icon={faMessage} /> <strong> Email:</strong>{" "}
                {formData?.donor.email}
              </h1>
              <h1 className="p-2">
                <FontAwesomeIcon icon={faPerson} /> <strong> User Type:</strong>{" "}
                {formData?.donor.userType}
              </h1>
            </div>
          ) : (
            <p>Page is Loading</p>
          )}
          <div>
            <h1 className="p-1">
              <strong> Total Requests:</strong> {formData?.requestedBy?.length}{" "}
            </h1>
            <h1 className="p-1">
              <strong> Total Accepted:</strong>{" "}
              {formData?.acceptedDonee?.length}{" "}
            </h1>
            <h1 className="p-1">
              <strong> Total Amount Funded:</strong> {total>0? total :0 } ethers{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <ListOfDonees
          requestedBy={formData?.requestedBy}
          handleAcceptRequest={handleAcceptRequest}
          isDonor={isDonor}
        />
      </div>
      <div className="mt-10">
        <DonationRequestsAccepted
          acceptedDonee={formData?.acceptedDonee}
          amount={formData?.amount}
         
        />
      </div>
    </div>
  );
};

export default AidOfferDetail;
