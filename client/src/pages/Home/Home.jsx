import React from "react";
import DonationLists from "./DonationLists";
import Slides from "./Slides";

function Home() {
  return (
    <div className="w-full h-screen ">
      <Slides />
      <DonationLists />
    </div>
  );
}

export default Home;
