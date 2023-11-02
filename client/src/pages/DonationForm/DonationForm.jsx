import React from "react";

const DonationForm = () => {
  return (
    <>
      <h2 className="font-bold text-center mt-4 text-black text-2xl mb-4">Launch Donations Request</h2>
      <form
        id="donation-request-form"
        className="bg-gray-800  m-auto p-6 w-3/5 rounded-lg flex flex-col 
         space-y-4"
      >
        <label
          htmlFor="dr-donation-type"
          className=" font-bold text-white "
         
        >
          Type Of Aid Required:
        </label>
        <select
          id="dr-donation-type"
          name="dr-donation-type"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base"
        >
          <option value="Food">Food</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Technical">Technical</option>
          <option value="Emergency">Emergency</option>
        </select>

        <label
          htmlFor="dr-name"
          className="block font-bold text-white" 
        >
          Product Name:
        </label>
        <input
          type="text"
          id="dr-name"
          name="dr-name"
         
          required
          className=" w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base"
        />

        <label
          htmlFor="dr-quantity"
          className="block font-bold  text-white" 
        >
          Quantity Required:
        </label>
        <input
          type="text"
          id="dr-quantity"
          name="dr-quantity"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg  text-gray-800 text-base"
        />

        <button
          type="submit"
          className="bg-white text-black px-9 py-2 rounded-lg text-base font-semibold hover:bg-green-500 hover:text-white transition duration-300 mt-8 mb-4"
        >
          Launch Donation Request
        </button>
      </form>
    </>
  );
};

export default DonationForm;
