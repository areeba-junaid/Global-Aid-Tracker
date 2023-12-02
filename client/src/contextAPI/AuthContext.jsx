import React, { createContext, useState } from "react";

// Create a context with default values
export const AuthContext = createContext("");

// Create a provider to wrap your components
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [accountAddress, setAccountAddress] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accountType,
        accountAddress,
        setIsAuthenticated,
        setAccountType,
        setAccountAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
