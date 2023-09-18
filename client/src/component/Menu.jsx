import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";

function Menu() {
  return (
    <div className="flex flex-col  w-full shadow-zinc-500 z-index-50 ">
      <Header ></Header>
      <Navbar ></Navbar>
    </div>
  );
}

export default Menu;
