import React, { useState } from "react";
import LaunchedProposals from "./LaunchedProposals";
import AppliedOffers from "./AppliedOffers";
import Footer from "../../component/Footer";

export default function DonorHistory() {
  const [activePage, setActivePage] = useState("launchedproposals");

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div>
      {/* Menu bar for switching between pages */}
      <div className="flex justify-center my-4">
        <button
          className={`px-10 py-2 mx-10 ${
            activePage === "launchedproposals"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => handlePageChange("launchedproposals")}
        >
          Launched Aid Request
        </button>
        <button
          className={`px-10 py-2 mx-2 ${
            activePage === "appliedoffers"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => handlePageChange("appliedoffers")}
        >
          Applied Offers
        </button>
      </div>

      {/* Display the selected page */}
      {activePage === "launchedproposals" && <LaunchedProposals />}
      {activePage === "appliedoffers" && <AppliedOffers />}
    </div>
  );
}

