import React from "react";
import LanguageIcon from '@mui/icons-material/Language';
export default function Header() {
  return (
    <>
      <div className="bg-black h-12 p-2 flex  justify-between items-center  shadow-slate-300 border-b border-gray-500 ">
        {/* Left Logo */}
        <div className="flex items-center">
        <LanguageIcon  className="h-8 w-8 text-white" />
          <span className="text-white text-lg ml-2">Global Aid</span>
        </div>

        {/* Center Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-3/4 px-1 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* Right Button */}
        <button className="bg-white text-blue-500 px-7 py-2 rounded-lg focus:outline-none hover:bg-gray-100">
          LogOut
        </button>
      </div>
    </>
  );
}
