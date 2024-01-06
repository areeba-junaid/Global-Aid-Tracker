import React, { useEffect, useState } from "react";
import ListOfDonees from "../AidRequestDetail/DonationRecord";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contextAPI/AuthContext";
import aidStyles from "../../utils/aidStyles";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,  
  faGlobe, 
  faPhone, 
  faMedkit,        // Medical icon
  faClock,         // Time icon
} from '@fortawesome/free-solid-svg-icons';


const AidOfferDetail = () => {
  const [formData, setFormData] = useState({});
  const { tId } = useParams();
  const { currentToken, accountAddress } = useAuth();
  const fetchData = async () => {
    try {
      console.log(currentToken);
      console.log(tId);
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

  const handleSubmit = (e) => {
    e.preventDefault();

   console.log('Saving proposals data:', formData);
      // Add logic to save data in the database

    setFormData({
      prposals: '',    
    });
    const aidType = 'Funds';

  };


  

  return (

    <div>hi</div>
  );
};

export default AidOfferDetail;