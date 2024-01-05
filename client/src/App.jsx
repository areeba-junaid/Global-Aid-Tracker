import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import DonationForm from "./pages/DonationForm/DonationForm";
import UserAccount from "./pages/UserAccount/UserAccount";
import DoneeHistory from "./pages/History/DoneeHistory";
import DonorHistory from "./pages/History/DonorHistory.jsx";
import AidRequestDetail from "./pages/AidRequestDetail/AidRequestDetail"
import AssetDetail from "./pages/AssetDetail/AssetDetail"
import Menu from "./component/Menu";
import MetamaskWallet from "./pages/MetamaskWallet.jsx/MetamaskWallet";
import { useAuth, AuthProvider } from "./contextAPI/AuthContext";
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
  const { isAuthenticated } = useAuth();
  return (
    <div className="m-0 p-0">
      {isAuthenticated && <Menu />}

      <Routes>
        <Route
          path="/"
          element={!isAuthenticated && <MetamaskWallet />}
        />
        <Route
          path="/homepage"
          element={isAuthenticated && <Home />}
        />
        <Route path="/register" element={ <Register />} />
        <Route
          path="/launch-donations"
          element={isAuthenticated  && <DonationForm /> }
        />
        <Route
          path="/donee-history"
          element={isAuthenticated && <DoneeHistory /> }
        />
        <Route
          path="/donor-history"
          element={isAuthenticated  && <DonorHistory /> }
        />

        <Route
          path="/user-account"
          element={isAuthenticated  && <UserAccount /> }
        />
         <Route
          path="/aid-detail/:tId"
          element={isAuthenticated  && <AidRequestDetail/> }
        />
         <Route
          path="/asset-detail/:tId"
          element={isAuthenticated  && <AssetDetail/> }
        />
      </Routes>
      
    </div>
  );
}
