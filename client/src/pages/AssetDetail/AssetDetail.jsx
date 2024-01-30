import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contextAPI/AuthContext";
import aidStyles from "../../utils/aidStyles";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobe,
  faPhone,
  faClock,
  faMessage,
  faPerson, // Time icon
} from "@fortawesome/free-solid-svg-icons";

const AidRequestDetail = () => {
  const [formData, setFormData] = useState({});
  const { currentToken, accountAddress } = useAuth();
  const { tId } = useParams();
  const fetchData = async () => {
    try {
      console.log(currentToken);
      console.log(tId);
      const response = await axios.get(
        "http://localhost:5000/api/assetOffer/asset-offer-detail",
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
          <div className="flex flex-row justify-between items-baseline rounded-md mb-3 px-4 py-4  ">
            <h2 className="text-3xl">
              {aidStyles[formData.aidType]?.icon} {formData.aidName}
            </h2>
            <h2 className="text-sm ">
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
          </div>

          <div className="bg-white rounded flex flex-row justify-around p-3">
            <h1>
              <strong>Aid Type:</strong> {formData.aidType}
            </h1>
            <h1>
              <strong>Aid Category:</strong> Asset
            </h1>
            <h1>
              <strong>Aid Type:</strong> {formData.status}
            </h1>
          </div>
        </div>

        <div className="flex-2 bg-blue-300 w-1/3  p-10 flex flex-col  rounded ">
          
        {formData.account ?  ( <h2 className="self-center font-bold text-2xl py-6">
              {formData.account.userType.toUpperCase()} INFORMATION
            </h2> ):(
            <p>Page is Loading</p>
          )}
          

          {formData.account ? (
            <div className="flex flex-col bg-white rounded p-6">
              <h1 className="p-2">
              <FontAwesomeIcon icon={faUser}/>  <strong> Name: </strong> {formData.account.name}
              </h1>
              <h1 className="p-2">
              <FontAwesomeIcon icon={faGlobe}/> <strong>Country: </strong> {formData.account.country}
              </h1>
              <h1 className="p-2">
              <FontAwesomeIcon icon={faPhone}/> <strong>Phone No:</strong> {formData.account.phone}
              </h1>
              <h1 className="p-2">
              <FontAwesomeIcon icon={faMessage}/>  <strong>Email:</strong> {formData.account.email}
              </h1>
              <h1 className="p-2">
              <FontAwesomeIcon icon={faPerson}/> <strong>User Type:</strong> {formData.account.userType}
              </h1>
            </div>
          ) : (
            <p>Page is Loading</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AidRequestDetail;
