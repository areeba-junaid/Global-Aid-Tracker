import React from "react";
import {
  LocalHospital,
  Restaurant,
  GppMaybe,
  School,
  Language,
} from "@mui/icons-material"; // Import MUI icons

const aidStyles = {
  Health: {
    color: "#B2BEB5",
    icon: <LocalHospital style={{ fontSize: "24px" }} />,
  },
  Educational: {
    color: "#ADD8E6",
    icon: <School />,
  },
  Emergency: {
    color: "#98AFC7",
    icon: <GppMaybe />,
  },
  Food: {
    color: "#D3D3D3",
    icon: <Restaurant />,
  },
  Technical: {
    color: "#D3D3D3",
    icon: <Language />,
  },
};

export default function DonateBox({ offer }) {
  return (
    <div className="w-3/4 flex flex-col justify-center">
      <div className="border border-gray-500 rounded">
        <div
          className="flex flex-row w-full text-3xl space-x-7 p-2"
          style={{ backgroundColor: aidStyles[offer.aidType].color }}
        >
          {aidStyles[offer.aidType].icon}
          <h3 className="">{offer.name}</h3>
        </div>
        <div className="p-4 font-semibold font-sans">
          <p>Aid Type: {offer.aidType}</p>
          <p>Quantity: {offer.quantity}</p>
          <p className="text-2xs overflow-hidden overflow-ellipsis whitespace-nowrap">
            Donor Address: {offer.donor}
          </p>
        </div>
      </div>
    </div>
  );
}
