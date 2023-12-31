
import { useAuth } from "../../contextAPI/AuthContext";
import DonationLists from "./DonationLists";
import AidOfferList from "./AidOfferList";
import Slides from "./Slides";
import Footer from "../../component/Footer";


function Home() {
 
  const {accountType} = useAuth();

  console.log(accountType)
  
  return (
    <div className="w-full h-screen ">
      <Slides />
      {accountType === "donee" ? (
        <AidOfferList />
      ) : accountType === "donor" ? (
        <DonationLists />
      ) : null}
      <Footer />
    </div>
    
  );
 
}

export default Home;
