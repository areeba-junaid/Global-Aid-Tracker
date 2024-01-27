import React, { useState } from "react";
import LaunchedOffers from "./LaunchedOffers";
import AcceptedProposals from "./AcceptedProposals";
import Footer from "../../component/Footer";

export default function DonorHistory() {
  const [activePage, setActivePage] = useState("launchedOffers");

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div>
      {/* Menu bar for switching between pages */}
      <div className="flex justify-center my-4">
        <button
          className={`px-10 py-2 mx-10 ${
            activePage === "launchedOffers"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => handlePageChange("launchedOffers")}
        >
          Launched Offers
        </button>
        <button
          className={`px-10 py-2 mx-2 ${
            activePage === "acceptedProposals"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => handlePageChange("acceptedProposals")}
        >
          Accepted Proposals
        </button>
      </div>

      {/* Display the selected page */}
      {activePage === "launchedOffers" && <LaunchedOffers />}
      {activePage === "acceptedProposals" && <AcceptedProposals />}

    </div>
  );
}
