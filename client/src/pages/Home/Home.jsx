
import DonationLists from "./DonationLists";
import Slides from "./Slides";
import { useEthereum } from "../../contextAPI/EthereumContext";
import { useAuth } from "../../contextAPI/AuthContext";

function Home() {
  const { state} = useEthereum();
  const {
    accountType,
    accountAddress,
  } = useAuth();
  console.log("AccountType",accountType,"state",state,"Account",accountAddress);
  return (
    <div className="w-full h-screen ">
      <Slides />
      <DonationLists />
    </div>
  );
}

export default Home;
