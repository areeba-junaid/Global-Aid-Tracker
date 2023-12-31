import React, { useContext, useState } from "react";
import { useAuth } from "../../contextAPI/AuthContext";
import axios from "axios";
const DonationForm = () => {
  const { accountType, accountAddress, currentToken } = useAuth();
  const [selectedOption, setSelectedOption] = useState("fund");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    let body = {
      aidType: event.target["dr-donation-type"].value,
      aidName: event.target["dr-name"].value,
      aidInfo: event.target["dr-info"].value,
      account: accountAddress
    };

    if (selectedOption === "fund") {
      if (accountType === "donee") {
        body = {
          ...body,
          amount: event.target["amount"].value,
        };
      } else if (accountType === "donor") {
        body = {
          ...body,
          amount: event.target["amount"].value,
          limit: event.target["limit"].value,
        };
      }
    }

    const apiUrl =
      selectedOption === "asset"
        ? "http://localhost:5000/api/assetOffer/create"
        : accountType === "donee"
        ? "http://localhost:5000/api/aidRequst/create"
        : "http://localhost:5000/api/aidOffer/create";
    let response;
    try {
     response = await axios.post(apiUrl, body, {
        headers: {
          authorization: currentToken,
        },
      });

      // Handle response as needed
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error("Error:", response , error.message);
    }
  };
  return (
    <>
      <h2 className={`font-bold text-center mt-4 text-black text-2xl mb-4`}>
        {accountType === "donee" ? "Aid Request" : "Launch Offers"}
      </h2>

      <form
        id="donation-request-form"
        className="bg-gray-600 m-auto p-6 w-2/5 rounded-lg flex flex-col space-y-4"
        onSubmit={formSubmitHandler}
      >
        <label htmlFor="dr-name" className="block font-bold text-white">
          Aid Name:
        </label>
        <input
          type="text"
          id="dr-name"
          name="dr-name"
          required
          className="w-full px-3 py-2 border border-gray-100 rounded-lg text-gray-800 text-base bg-white"
        />

        <label htmlFor="dr-info" className="block font-bold text-white">
          Aid Info:
        </label>
        <textarea
          type="text"
          id="dr-info"
          name="dr-info"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white"
        />

        <label
          htmlFor="dr-donation-type"
          className="block font-bold text-white"
        >
          Aid Type:
        </label>
        <select
          id="dr-donation-type"
          name="dr-donation-type"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white"
        >
         
          <option value="education">Education</option>
          <option value="emergency">Emergency</option>
          <option value="food">Food</option>
          <option value="health">Health</option>
          <option value="technology">Technology</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="donation-type" className="font-bold text-white">
          Aid Form:
        </label>
        <div className="flex items-center">
          <input
            type="radio"
            id="fund"
            name="donation-type"
            value="fund"
            checked={selectedOption === "fund"}
            onChange={handleOptionChange}
            className="mr-2"
          />
          <label htmlFor="fund" className="text-white">
            Fund
          </label>
          <input
            type="radio"
            id="asset"
            name="donation-type"
            value="asset"
            checked={selectedOption === "asset"}
            onChange={handleOptionChange}
            className="ml-4 mr-2"
          />
          <label htmlFor="asset" className="text-white">
            Asset
          </label>
        </div>

        {selectedOption === "fund" && (
          <>
            <label htmlFor="amount" className="block font-bold text-white">
              Amount In Ether:
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white"
            />
          </>
        )}

        {accountType === "donor" && (
          <label
            htmlFor="offers-open-to"
            className="block font-bold text-white"
          >
            Offers Open To:
            <input
              type="text"
              id="offers-open-to"
              name="offers-open-to"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base bg-white"
            />
          </label>
        )}

        <input
          type="submit"
          className="bg-white text-black px-9 py-2 rounded-lg text-base font-semibold hover:bg-green-500 hover:text-white transition duration-300 mt-8 mb-4"
          Launch
        />
      </form>
    </>
  );
};

export default DonationForm;
