import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import DonationForm from "./pages/DonationForm/DonationForm";
import UserAccount from "./pages/UserAccount/UserAccount";
import DoneeHistory from "./pages/History/DoneeHistory";
import DonorHistory from "./pages/History/DonorHistory.jsx";
import Menu from "./component/Menu";
import MetamaskWallet from "./pages/MetamaskWallet.jsx/MetamaskWallet";
import { AuthContext, AuthProvider } from "./contextAPI/AuthContext";
import { EthereumProvider } from "./contextAPI/EthereumContext";

export default function App() {
  return (
    <AuthProvider>
      <EthereumProvider>
        <AppContent />
      </EthereumProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="m-0 p-0">
      {isAuthenticated && <Menu />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <MetamaskWallet />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/launch-donations"
          element={isAuthenticated ? <DonationForm /> : <MetamaskWallet />}
        />
        <Route
          path="/donee-history"
          element={isAuthenticated ? <DoneeHistory /> : <MetamaskWallet />}
        />
        <Route
          path="/donor-history"
          element={isAuthenticated ? <DonorHistory /> : <MetamaskWallet />}
        />

        <Route
          path="/user-account"
          element={isAuthenticated ? <UserAccount /> : <MetamaskWallet />}
        />
      </Routes>
    </div>
  );
}
