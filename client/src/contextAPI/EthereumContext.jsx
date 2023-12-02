import React, { createContext, useState, useContext } from "react";

export const EthereumContext = createContext();

export function EthereumProvider({ children }) {
  
  const [state, setState] = useState({
    contractRead:null,
    contractWrite:null,
    signer: null,
  });

  const contextValue = {
    state, 
    setState,
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
