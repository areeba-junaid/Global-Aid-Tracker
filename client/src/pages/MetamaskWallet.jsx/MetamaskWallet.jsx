import { React,useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import metamask from "../../assets/images/metamask.png";
import { getAccountInfo,} from "../../utils/Token";
import { useEthereum } from "../../contextAPI/EthereumContext";
import { useAuth } from "../../contextAPI/AuthContext";

export default function MetamaskWallet() {
  const chainId = "0xaa36a7";
  const [connectError, setConnectError] = useState("");
  const { accountAddress, setAccountAddress,setIsAuthenticated,setCurrentToken } = useAuth();
  const {setToken}=useEthereum();

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear()
    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    // Cleanup the event listener when the component unmounts
    return () => {
      ethereum.off("accountsChanged", handleAccountsChanged);
      ethereum.off("chainChanged", handleChainChanged);
    };
  }, [accountAddress]);

  const handleAccountsChanged = (accounts) => {
    const newAccount = ethers.utils.getAddress(accounts[0]);
    setAccountAddress(newAccount);
  };
  const handleChainChanged = (network) => {
    network != chainId
      ? setConnectError("Switch to Correct Chain")
      : setConnectError("");
  };
  const connectHandler = async () => {
    try {
      if (window.ethereum) {
        let accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccountAddress(account);
        setConnectError("");
      }
      setConnectError("");
    } catch (error) {
      console.log(error);
      setConnectError("Error Connecting to Metamask");
      console.log(connectError);
    }
    await networkHandler();
  };

  const networkHandler = async () => {
    try {
      const network = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (network !== chainId) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
      }
    } catch (err) {
      if (err.code == 4001) {
        setConnectError("Connet to Required Chain of Website");
      }
      if (err.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Sepolia test network", // Adjust the chain name as needed
                chainId: chainId,
                nativeCurrency: { name: "Eth", decimals: 18, symbol: "ETH" },
                rpcUrls: ["https://sepolia.infura.io/v3/"],
              },
            ],
          });
        } catch (addChainErr) {
          console.error("Error adding Ethereum chain:", addChainErr);
          setConnectError("Error adding Ethereum chain");
        }
      }
    }
  };
  const personalSign=async(message)=>{
    
    try {
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, accountAddress],
      });
      console.log("Signature:", signature);
      setConnectError("")
      return signature;
} catch (error) {
  console.error("Error signing message:", error);
  setConnectError("Please Sign in to continue")
  return null;

}
  }
  const token =async (signature , message ) => {
    try {
      const response = await fetch("http://localhost:5000/api/authToken/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signature, message, address: accountAddress }),
      });
  
      if (!response.ok) {
        setConnectError("Error creating token");
        return;
      }
      const responseBody = await response.json();
      const token = responseBody.token;
      console.log("Token" , token)
      await sessionStorage.setItem("token", token);
      await setCurrentToken(token);
      await setToken(token);
  
    } catch (error) {
      console.error("Error creating token:", error);
      setConnectError("Error creating token");
    }
  }
   
   
  
  const checkUser =async() => {
    try {
      if (accountAddress && !connectError) {
        const message = "Sign this message";
        const signature= await personalSign(message);
        if(!signature){
          return;
        }
        await token(signature, message);
        const data = await getAccountInfo();
        console.log(data)
        if (data.error) {
         navigate("/register")
        } else {
         setIsAuthenticated(true);
         navigate("/homepage")
        }
      } else {
        setConnectError("Connect to Wallet First");
      }
    } catch (error) {
      console.log(error);
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
          {!connectError && accountAddress
            ? "Connected To: " +
              accountAddress.slice(0, 6) +
              "..." +
              accountAddress.slice(38, 42)
            : "Connect"}
        </button>

        <button
          className="w-2/12 bg-blue-600 text-white p-2  rounded"
          onClick={checkUser}
        >
          Continue
        </button>
      </div>
    </>
  );
}
