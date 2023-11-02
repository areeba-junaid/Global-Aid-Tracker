import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Authenticate from "./pages/Authentication/Authenticate";
import HomePage from "./pages/Home/HomePage";
import UserList from "./pages/UserList/UserList";
import DonationForm from "./pages/DonationForm/DonationForm";
import Profile from "./pages/Profile/Profile";
import History from "./pages/History/History";
import Menu from "./component/Menu";

import { EthereumProvider } from "./ContextAPI/EthereumContext";
export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <EthereumProvider>
    <div className="m-0 p-0">
      {isAuthenticated && <Menu />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Authenticate />}
        />
        <Route
          path="/user-donations-launches"
          element={isAuthenticated ? <UserList /> : <Authenticate />}
        />
        <Route
          path="launch-donations"
          element={isAuthenticated ? <DonationForm /> : <Authenticate />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <History /> : <Authenticate />}
        />

        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Authenticate />}
        />
      </Routes>
     
    </div>
    </EthereumProvider>
  );
}
