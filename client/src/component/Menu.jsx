import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";

function Menu() {
  return (
    <div className="sticky top-0 bg-white z-50">
      <div className="sticky top-0">
        <Header />
        <Navbar />
      </div>
    </div>
  );
}

export default Menu;