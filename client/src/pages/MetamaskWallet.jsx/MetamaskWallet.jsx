import { React, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import metamask from "../../assets/images/metamask.png";
import { AuthContext } from "../../contextAPI/AuthContext";
import { useEthereum } from "../../contextAPI/EthereumContext";
// ABIs
import abi from "../../abis/Donations.json";
// Config
import config from "../../config.json";

export default function MetamaskWallet() {
  const { state, setState } = useEthereum();

  const {
    setIsAuthenticated,
    setAccountType,
    accountAddress,
    setAccountAddress,
  } = useContext(AuthContext);
  const [connectError, setConnectError] = useState("");
  const navigate = useNavigate();

  const initContract = async () => {
    try {
      const contractABI = abi.abi;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const contractRead = new ethers.Contract(
        config[network.chainId].contract.address,
        contractABI,
        provider
      );
      const contractWrite = new ethers.Contract(
        config[network.chainId].contract.address,
        contractABI,
        provider.getSigner()
      );
      const signer = await provider.getSigner().getAddress();
      setState({
        contractRead,
        contractWrite,
        signer,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    const handleAccountsChanged = (accounts) => {
      const newAccount = ethers.utils.getAddress(accounts[0]);
      setAccountAddress(newAccount);
      initContract();
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    // Cleanup the event listener when the component unmounts
    return () => {
      ethereum.off("accountsChanged", handleAccountsChanged);
    };
  }, [accountAddress]);

  const checkUser = async () => {
    try {
      if (accountAddress && state.signer === accountAddress) {
        setConnectError("");
        const userInfo = await state.contractRead.getUserInfo();
        console.log(userInfo);
        if (userInfo[1] == true) {
          setIsAuthenticated(true);
          userInfo[0] === 1 ? setAccountType("donor") : setAccountType("donee");
          navigate("/");
        } else {
         
          navigate("/register");
        }
      } else {
        setConnectError("Connect to Wallet First");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectHandler = async () => {
    try {
      if (window.ethereum) {
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccountAddress(account);
      }
      initContract();
      setConnectError("");
    } catch (error) {
      console.log(error);
      setConnectError("Error Connecting to Metamask");
      console.log(connectError);
    }
  };

  return (
    <>
      <p className="w-full  text-white font-semibold text-sm  bg-red-400 text-center">
        {connectError}
      </p>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl  text-black  font-semibold">
          Global Aid Tracker
        </h1>
        <img src={metamask} alt="Metamask Icon" />
        <button
          className="m-6 w-2/6 text-center p-2 rounded-full text-white text-2xl  bg-orange-500 hover:bg-orange-600 "
          type="button"
          onClick={connectHandler}
        >
          {accountAddress
            ? accountAddress.slice(0, 6) + "..." + accountAddress.slice(38, 42)
            : "Connect to Wallet"}
        </button>

        <button
          className="w-2/12 bg-blue-600 text-white p-2 "
          onClick={checkUser}
        >
          Continue
        </button>
      </div>
    </>
  );
}
