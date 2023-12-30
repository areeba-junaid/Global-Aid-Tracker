// EthereumProvider.js

import React, { createContext, useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
// ABIs
import abi from "../abis/Donations.json";
// Config
import config from "../config.json";

export const EthereumContext = createContext();

export function EthereumProvider({ children }) {
  const [state, setState] = useState({
    contractRead: null,
    contractWrite: null,
  });
  const [token,setToken]=useState(sessionStorage.getItem("token"));
  
  useEffect(() => {
  
    const initializeContract = async () => {
      try {
        // Check if the account address exists in sessionStorage
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
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
          
          setState({
            contractRead,
            contractWrite,
          });
         
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initializeContract();
  }, [token]);

  const contextValue = {
    state,
    setState,
    token,
    setToken,
  };

  return (
    <EthereumContext.Provider value={contextValue}>
      {children}
    </EthereumContext.Provider>
  );
}
export function useEthereum() {
  return useContext(EthereumContext);
}
