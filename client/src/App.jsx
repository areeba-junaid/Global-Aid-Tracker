import { Route, Routes,Navigate} from "react-router-dom";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import DonationForm from "./pages/DonationForm/DonationForm";
import UserAccount from "./pages/UserAccount/UserAccount";
import DoneeHistory from "./pages/History/DoneeHistory";
import DonorHistory from "./pages/History/DonorHistory.jsx";
import AidRequestDetail from "./pages/AidRequestDetail/AidRequestDetail"
import AssetDetail from "./pages/AssetDetail/AssetDetail"
import Menu from "./component/Menu";
import Footer from "./component/Footer";
import MetamaskWallet from "./pages/MetamaskWallet.jsx/MetamaskWallet";
import NotFound from "./pages/NotFound";
import { useAuth, AuthProvider } from "./contextAPI/AuthContext";
import { EthereumProvider } from "./contextAPI/EthereumContext";
import AidOfferDetail from "./pages/AidOfferDetail/AidOfferDetail";



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
          element={!isAuthenticated ? <MetamaskWallet />:<Navigate to="/homepage" />
        }
        />
        <Route
          path="/homepage"
          element={isAuthenticated && <Home />}
        />
        <Route path="/register" element={!isAuthenticated ? <Register /> :<Navigate to="/homepage" />} />
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
          path="/aid-request-detail/:tId"
          element={isAuthenticated  && <AidRequestDetail/> }
        />
         <Route
          path="/asset-detail/:tId"
          element={isAuthenticated  && <AssetDetail/> }
        />
        <Route
          path="/aid-offer-detail/:tId"
          element={isAuthenticated  && <AidOfferDetail/> }
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
 
    </div>
  );
}
