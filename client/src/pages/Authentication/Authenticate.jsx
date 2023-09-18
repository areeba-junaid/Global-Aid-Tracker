import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css"; // Import the CSS
import PhoneInput from "react-phone-number-input"; // Import the phone input component
import { validateName, validateEmail, validatePhoneNumber } from "./Validation";

export default function Authenticate() {
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    orgNumber: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [code, setCode] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setFieldErrors({
      ...fieldErrors,
      name: !validateName(newName) ? "Invalid organization name" : "",
    });
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setFieldErrors({
      ...fieldErrors,
      email: !validateEmail(newEmail) ? "Invalid Email" : "",
    });
  };

  const handlePhoneChange = () => {
    console.log(phoneNumber);
    console.log(validatePhoneNumber(phoneNumber));
    setFieldErrors({
      ...fieldErrors,
      phone: !validatePhoneNumber(phoneNumber) ? "Invalid phoneNumber" : "",
    });
  };

  //Countriies list
  const changeHandler = (selectedOption) => {
    const countryCode = countryList().getValue(selectedOption.label);
    setSelectedCountry(selectedOption);
    setCode(countryCode);
  };
  const registerUser = (event) => {
    event.preventDefault();
    const name = event.target.orgName.value;
    console.log(name);
  };

  return (
    <div className="h-screen w-screen min-h-screen bg-gray-200">
      <div className="p-2">
        <h1 className="text-2xl  text-black  font-semibold">Global Aid</h1>
      </div>
      <form className="max-w-sm  mx-auto flex flex-col space-y-1 bg-white p-5 rounded shadow-md text-gray-600">
        <h1 className="m-2 text-2xl text-center text-black">
          Register Account
        </h1>
        <div className>
          <input
            type="text"
            name="orgName"
            placeholder="Organization Name"
            className={`block border ${
              fieldErrors.name ? "border-red-500" : "border-grey-light"
            } w-full p-1 rounded mb-4`}
            onBlur={handleNameChange}
            required
          />
          {fieldErrors.name && (
            <span className="text-red-500 text-sm ">{fieldErrors.name}</span>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`block border ${
              fieldErrors.email ? "border-red-500" : "border-grey-light"
            } w-full p-1 rounded mb-4`}
            onBlur={handleEmailChange}
            required
          />
          {fieldErrors.email && (
            <span className="text-red-500 text-sm ">{fieldErrors.email}</span>
          )}
          <Select
            className="block w-full p-1  rounded mb-4"
            options={options}
            value={selectedCountry}
            onChange={changeHandler}
            defaultValue={{ label: "Afghanistan", value: 0 }} // Corrected syntax
          />
          <PhoneInput
            placeholder="Phone Number"
            className="border border-grey-light p-1 w-full   rounded mb-4"
            country="US"
            value={phoneNumber}
            onChange={setPhoneNumber}
            onBlur={handlePhoneChange}
          />
          {fieldErrors.phone && (
            <span className="text-red-500 text-sm ">{fieldErrors.phone}</span>
          )}
          <select
            id="userType"
            name="userType"
            className="block border border-grey-light w-full p-1 rounded mb-4"
            required
          >
            <option value="0">DONEE</option>
            <option value="1">DONOR</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full text-center py-1 rounded text-white  bg-blue-800 hover:bg-blue-600"
        >
          Register
        </button>
        <p className="text-center">OR</p>
        <button
          className="w-full text-center py-1 rounded text-white  bg-orange-700 hover:bg-orange-600"
          type="button"
        >
          Connect To Wallet
        </button>
      </form>
    </div>
  );
}
