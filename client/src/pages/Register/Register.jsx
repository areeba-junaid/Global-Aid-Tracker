import { useState, useMemo, useContext } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { validateName, validateEmail, validatePhoneNumber } from "./Validation";
import { useAuth } from "../../contextAPI/AuthContext";
import { useEthereum } from "../../contextAPI/EthereumContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Authenticate() {
  const { setToken } = useEthereum();
  const {
    setIsAuthenticated,
    setAccountType,
    accountAddress,
    setCurrentToken,
    currentToken
  } = useAuth();
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    counry:"",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    console.log("The name Validation", validateName(newName));
    setFieldErrors({
      ...fieldErrors,
      name: !validateName(newName) ? "Invalid organization name" : "",
    });
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    console.log("Email Validation",validateName(newEmail));
    setFieldErrors({
      ...fieldErrors,
      email: !validateEmail(newEmail) ? "Invalid Email" : "",
    });
    console.log("Email", fieldErrors);
   
  };

  const handlePhoneChange = () => {
    setFieldErrors({
      ...fieldErrors,
      phone: !validatePhoneNumber(phoneNumber) ? "Invalid phoneNumber" : "",
    });
  };
  
  const changeHandler = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const registerDb = async (body) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/create",
        body,{
          headers: {
            authorization: currentToken,
          },
        });
      if (response.status === 201) {
        console.log("Registered Successfully");
        return 1;
      } 
    
    } catch (err) {
      console.error("Axios request failed:", err.response.data.error);
      alert(err.response.data.error);
      return 0;
    }
  };
  const registerUser = async (event) => {
    event.preventDefault();
    if(selectedCountry===""){
      alert("Please Select your Country");
      return;
    }
    if (
      fieldErrors.name !== "" ||
      fieldErrors.email !== "" ||
      fieldErrors.phone !== ""
    ) {
      alert("Invalid input. Please Enter correct Data");
      return;
    }
    
    // Access the form element
    try {
      let form = event.target;
      const body = {
        accountNo: accountAddress,
        name: form.orgName.value,
        email: form.email.value,
        country: selectedCountry.label,
        phone: phoneNumber,
        userType: form.userType.value === '1' ? "donor" : "donee",
      }
     
        const resultDb = await registerDb(body);
        if (resultDb === 1) {
          const token = sessionStorage.getItem("token");
          setIsAuthenticated("true");
          setAccountType(body.userType);
          setCurrentToken(token);
          setToken(token);
          console.log("Register to Blockchain");
          navigate("/homepage");}
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen min-h-screen bg-gray-200">
      <div className="p-2">
        <h1 className="text-4xl  text-black  font-semibold">Global Aid</h1>
      </div>
      <form
        className="max-w-sm  m-auto flex flex-col  bg-white p-6 rounded shadow-md text-gray-600"
        onSubmit={registerUser}
      >
        <h1 className="m-2 text-2xl text-center text-black">
          Register Account
        </h1>

        {fieldErrors.name && (
          <span className="text-red-500 text-sm ">{fieldErrors.name}</span>
        )}
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
        {fieldErrors.email && (
          <span className="text-red-500 text-sm ">{fieldErrors.email}</span>
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

        <Select
          className="block w-full p-1  rounded mb-4"
          options={options}
          value={selectedCountry}
          onChange={changeHandler}
        />
        {fieldErrors.phone && (
          <span className="text-red-500 text-sm ">{fieldErrors.phone}</span>
        )}
        <PhoneInput
          placeholder="Phone Number"
          className="border border-grey-light p-1 w-full   rounded mb-4"
          value={phoneNumber}
          required
          withCountryCallingCode='+92'
          international='true'
          onChange={setPhoneNumber}
          onBlur={handlePhoneChange}
        />

        <select
          id="userType"
          name="userType"
          className="block border border-grey-light w-full p-1 rounded mb-4"
          required
        >
          <option value="0">DONEE</option>
          <option value="1">DONOR</option>
        </select>

        <input
          type="submit"
          className="w-full text-center py-2 rounded text-white  bg-blue-800 hover:bg-blue-600"
          value="Register Wallet"
        />
      </form>
    </div>
  );
}
