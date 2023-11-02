import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
// ABIs
import abi from "../abis/Donations.json";

// Config
import config from "../config.json";

const EthereumContext = createContext();

export function EthereumProvider({ children }) {
  const [state, setState] = useState({
    provider: null,
    contract: null,
  });

  const initContract = async () => {
    try {
      const contractABI = abi.abi;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      const contract = new ethers.Contract(
        config[network.chainId].contract.address,
        contractABI,
        provider
      );
      setState({ provider, contract });
      console.log("The contract :", contract);
      console.log("The provider :", provider);
   
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initContract();
  }, []);

  return (
    <EthereumContext.Provider value={state}>
      {children}
    </EthereumContext.Provider>
  );
}

export function useEthereum() {
  return useContext(EthereumContext);
}
