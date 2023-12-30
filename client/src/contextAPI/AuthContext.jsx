import React, { createContext, useState, useEffect, useContext } from "react";
import { getAccountInfo, decodeToken } from "../utils/Token";

export const AuthContext = createContext();

// Create a provider to wrap your components
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [accountAddress, setAccountAddress] = useState(null);
  const [currentToken, setCurrentToken] = useState(
    sessionStorage.getItem("token")
  );

  const valueInit = async () => {
    try {
      const address=await decodeToken()
      setAccountAddress(address);
      const data = await getAccountInfo();
      if (data) {
        if (data.userType) {
          setAccountType(data.userType);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Error initializing authentication:", error);
    }
  };
 
  useEffect(() => {
    
    if( sessionStorage.getItem("token"))
    { 
      valueInit();
    }
  }, [currentToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accountType,
        accountAddress,
        currentToken,
        setIsAuthenticated,
        setAccountType,
        setAccountAddress,
        setCurrentToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
