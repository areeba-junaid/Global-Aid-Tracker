import React from "react";
import { Facebook, Instagram, YouTube, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-black text-white p">
      <div className="flex justify-center items-center">
        <h2 className="font-lg">About Us</h2>
        <span className="mx-2">|</span>
        <h2 className="font-lg">Privacy Policy</h2>
        <span className="mx-2">|</span>
        <h2 className="font-lg">Terms and Services</h2>
      </div>
      <div className="mt-2">
        <div className="flex justify-center space-x-3">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Facebook style={{ fontSize: "25px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Instagram style={{ fontSize: "25px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <YouTube style={{ fontSize: "25px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Twitter style={{ fontSize: "25px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <LinkedIn style={{ fontSize: "25px" }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
