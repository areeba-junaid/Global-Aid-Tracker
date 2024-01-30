import React, { useState, useEffect } from "react";
import { useAuth } from "../../contextAPI/AuthContext";
import { getAccountInfo } from "../../utils/Token";
import "tailwindcss/tailwind.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import axios from "axios";


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
  const [changeData, setChangeData] = useState({});
  const [error, setError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { currentToken } = useAuth();
  const options = countryList().getData();
  const updateAccount = async (body) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/update",
        body,
        {
          headers: {
            authorization: currentToken,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
       
        setFormData(response.data);
        setChangeData(response.data); 

      }
    } catch (err) {
      console.error("Axios request failed", err);
      alert(err.response.data.error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
    console.log(formData);
    const body = {
      accountNo: formData.accountNo,
      country: selectedCountry.label,
      phone: phoneNumber,
      name: changeData.name,
      email: changeData.email,
    };

    if (isEditMode) {
      console.log(body);
      updateAccount(body);
    }

    setIsEditMode(false);
  };

  const fetchAccountInfo = async () => {
    const result = await getAccountInfo();
    console.log(result);
    setFormData(result);
    setChangeData(result);
    setPhoneNumber(result.phone);
  };
  useEffect(() => {
    fetchAccountInfo();
  }, []);

  return (
    <div className="container max-w-3xl mx-auto mt-5 mb-2 p-8 text-left rounded shadow relative">
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
        <div className="sub-container flex flex-row bg-gray-200 border border-blue-300 rounded px-8 py-8 mb-8">
          <div className="flex-1 w-2/4">
            <label className="flex items-center mb-4">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUser} />
              </span>
              {!isEditMode && (
                <p className="p-1 bg-white  w-3/4 px-2 py-1 rounded ">
                  {" "}
                  {formData.name}{" "}
                </p>
              )}
              {isEditMode && (
                <input
                  type="text"
                  name="name"
                  value={changeData.name}
                  onChange={(e) =>
                    setChangeData({
                      ...changeData,
                      name: e.target.value,
                    })
                  }
                  required
                  minLength="2"
                  maxLength="30" // Set the maximum character limit to 100
                  pattern="[A-Za-z ]+"
                  title="Only alphabets and spaces are allowed."
                  className="field-input w-3/4 px-2 py-1 rounded"
                />
              )}
            </label>
            <br />
            <label className="flex items-center mb-4">
              <span className="mr-2">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              {!isEditMode && (
                <p className="p-1 bg-white  w-3/4 px-2 py-1 rounded ">
                  {" "}
                  {formData.email}{" "}
                </p>
              )}

              {isEditMode && (
                <input
                  type="email"
                  name="email"
                  value={changeData.email}
                  required
                  maxLength={50}
                  onChange={(e) =>
                    setChangeData({
                      ...changeData,
                      email: e.target.value,
                    })
                  }
                  pattern="[A-Za-z][A-Za-z0-9.]*[A-Za-z0-9]@gmail\.com"
                  title="Enter a valid Gmail address."
                  className="field-input w-3/4 px-2 py-1 rounded"
                />
              )}
            </label>
          </div>

          <div className="flex-2 w-2/4">
            <label className="flex items-center mb-1">
              <span className="mr-2">
                <FontAwesomeIcon icon={faGlobe} />
              </span>
              {!isEditMode && (
                <p className="p-2 bg-white  w-3/4 px-2 py-1 rounded ">
                  {" "}
                  {formData.country}{" "}
                </p>
              )}
              {isEditMode && (
                <Select
                  name="country"
                  options={options}
                  value={selectedCountry}
                  onChange={(selectedOption) =>
                    setSelectedCountry(selectedOption)
                  }
                  required
                  className="field-input w-3/4  rounded"
                />
              )}
            </label>
            <br />
            <label className="flex items-center mb-4">
              {!isEditMode && (
                <>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  <p className="p-1 bg-white  w-3/4 px-2 py-1 rounded ">
                    {" "}
                    {formData.phone}{" "}
                  </p>
                </>
              )}
              {isEditMode && (
                <div>
                  <PhoneInput
                    className="border border-grey-light p-2 w-full rounded "
                    value={phoneNumber}
                    required
                    withCountryCallingCode="+92"
                    international={true}
                    onChange={setPhoneNumber}
                    onBlur={() =>
                      isPossiblePhoneNumber(phoneNumber)
                        ? setError(false)
                        : setError(true)
                    }
                  />
                  {error && (
                    <span className="text-red-500 text-sm">
                      Phone number is not valid.
                    </span>
                  )}
                </div>
              )}
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

          <button
            className="save-btn bg-blue-500 rounded shadow text-white p-1 px-4 m-1"
            onClick={(event) => {
              event.preventDefault();
              if (isEditMode) {
                setChangeData(formData);
                setSelectedCountry("");
                setPhoneNumber(formData?.phone);
                setError(false);
              }
              setIsEditMode(!isEditMode);
              
            }}
          >
            {isEditMode ? "Cancel Edit" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAccount;
