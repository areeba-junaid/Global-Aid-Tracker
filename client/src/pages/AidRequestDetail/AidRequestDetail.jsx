// Specific Aid Request Page
//the final one with professional UI

import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import DonationRecord from "./DonationRecord";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contextAPI/AuthContext";
import aidStyles from "../../utils/aidStyles";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobe,
  faPhone,
  faPills, // Medical icon
  faClock, // Time icon
} from "@fortawesome/free-solid-svg-icons";

const AidRequestDetail = () => {
  const [formData, setFormData] = useState({});
  const { tId } = useParams();
  const { currentToken, accountAddress } = useAuth();
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
  }, [tId]);
  console.log("formData.aidType:", formData.aidType);
  console.log("aidStyles[formData.aidType]:", aidStyles[formData.aidType]);
  console.log(
    "aidStyles[formData.aidType].icon:",
    aidStyles[formData.aidType]?.icon
  );
  return (
    <div className="container w-max-8 mx-auto mb-10 p-3 rounded shadow ">
      <div className="flex">
        <div className="flex-1 bg-gray-200 w-2/5 px-6 py-3 rounded border flex flex-col ">
          <div className="flex flex-row justify-between rounded-md mb-3 px-4 py-4  ">
            <h2 className="text-4xl">
              {aidStyles[formData.aidType]?.icon} {formData.aidName}
            </h2>
            <h2 className="text-2xl ">
              <FontAwesomeIcon icon={faClock} /> 12/08/23 04:25 PM
            </h2>
          </div>

          <div className=" bg-white rounded-md px-4 py-4 mb-5">
            <p className="p-1 mb-5">
              <strong className="text-2xl ">Aid Information: </strong>
              {formData.aidInfo} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Saepe, dignissimos? Necessitatibus enim, sequi
              iste vitae incidunt modi. Temporibus optio nisi esse reprehenderit
              distinctio illo, debitis perspiciatis blanditiis atque laboriosam
              vitae.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Saepe, dignissimos? Necessitatibus enim, sequi iste vitae incidunt
              modi. Temporibus optio nisi esse reprehenderit distinctio illo,
              debitis perspiciatis blanditiis atque laboriosam vitae. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Saepe,
              dignissimos? Necessitatibus enim, sequi
            </p>

            <h2>
              <strong>Funds Required:</strong> {formData.targetAmount} ethers{" "}
            </h2>
            <h2>
              <strong>Funds Collected:</strong> {formData.collectedAmount}{" "}
              ethers{" "}
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
              <strong>Aid Type:</strong> {formData.status}
            </h1>
          </div>

          <button
            className="bg-green-700  hover:bg-green-600 rounded shadow self-center text-white p-2 w-4/12 mt-5"
            type="submit"
          >
            Accept Request
          </button>
        </div>

        <div className="flex-2 bg-blue-300 w-1/3  p-10 flex flex-col  rounded ">
          <h2 className="self-center font-bold text-2xl py-6">DONEE INFORMATION</h2>

         {formData.donee?( <div className="flex flex-col bg-white rounded p-6">
           
            <h1 className="p-2">
              <strong> Name: </strong> {formData.donee.name}
            </h1>
            <h1 className="p-2">
              <strong>Country: </strong> {formData.donee.country}
            </h1>
            <h1 className="p-2">
              <strong>Phone No:</strong> {formData.donee.phone}
            </h1>
          </div>):(<p>Page is Loading</p>)}
        </div>
      </div>
       <div className="mt-10">
        <DonationRecord/> 
      </div>
    </div>
  );
};

export default AidRequestDetail;
