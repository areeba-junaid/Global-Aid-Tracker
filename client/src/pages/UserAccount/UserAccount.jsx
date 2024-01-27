//UserAccount Page
// The final version with updations in UI (with both buttons) working/eiting/updating.
// approved one

import React, { useState, useEffect } from "react";
import { getAccountInfo } from "../../utils/Token";
import "tailwindcss/tailwind.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faGlobe,
  faPhone,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const UserAccount = () => {
  const [formData, setFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const options = countryList().getData(); // Define the 'options' variable for countries

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      console.log("Updating data:", formData);
      // Add logic to update data in the database
    }

    setIsEditMode(false);
  };

  const fetchAccountInfo = async () => {
    const result = await getAccountInfo();
    setFormData(result);
    //console.log(setFormData(result));
  };
  useEffect(() => {
    fetchAccountInfo();
  }, []);
 

  return (
    <div className="container max-w-3xl mx-auto mt-10 mb-10 p-8 text-left rounded shadow relative">
      <h1 className="text-gray-600 font-bold text-center text-3xl">
        {isEditMode
          ? "EDIT PERSONAL INFORMATION"
          : "PERSONAL ACCOUNT INFORMATION"}
      </h1>
      <br />

      <div className="text-gray-600 bg-blue-300 px-4 py-3">
        <label className="flex items-center">
          <span className="mr-2">
            <FontAwesomeIcon icon={faCreditCard} />
          </span>
          <h1 className="font-  bg-blue-300 w-3/4 px-2 py-1">
            {formData.accountNo}
          </h1>
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="sub-container flex bg-gray-200 border border-blue-300 rounded px-8 py-8 mb-8">
          <div className="flex-1">
            <label className="flex items-center mb-4">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                readOnly={!isEditMode}
                maxLength="100"  // Set the maximum character limit to 100
                pattern="[A-Za-z ]+"
                title="Only alphabets and spaces are allowed."
                className="field-input w-3/4 px-2 py-1 rounded"
              />
            </label>
            <br />
            <label className="flex items-center mb-4">
              <span className="mr-2">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                readOnly={!isEditMode}
                maxLength={50}
                pattern="[A-Za-z][A-Za-z0-9.]*[A-Za-z0-9]@gmail\.com"
                title="Enter a valid Gmail address."
                className="field-input w-3/4 px-2 py-1 rounded"
              />
            </label>
          </div>

          <div className="flex-2">
            <label className="flex items-center mb-4">
              <span className="mr-2">
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              <Select
                name="country"
                options={options} 
                value={formData.country}
                required
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    country: selectedOption,
                  })
                }
                isDisabled={!isEditMode}
                className="field-input w-3/4 px-2 py-1 rounded"
              />
            </label>
            <br />
            <label className="flex items-center mb-4">
              <span className="mr-2">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <PhoneInput
                name="phone"
                value={formData.phone}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    phone: value,
                  })
                }
                required
                readOnly={!isEditMode}
                maxLength={13}
                title="Please enter a valid 10-digit phone number"
                className="field-input w-3/4 px-2 py-1 rounded"
              />
            </label>
          </div>
        </div>

        <div className="text-left">
          <button
            className="save-btn bg-blue-500 rounded shadow text-white p-1 px-4 m-1"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>

      <div className="text-right">
        <button
          className="save-btn bg-blue-500 rounded shadow text-white p-1 px-4 m-1"
          onClick={() => {
          setIsEditMode(!isEditMode);
          }}
        >
          {isEditMode ? "Cancel Edit" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default UserAccount;
