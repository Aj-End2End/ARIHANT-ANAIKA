import React from "react";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleClickTerms = () => {
    navigate("/terms");
    window.scrollTo(0, 0);
  };

  const handleClickPolicy = () => {
    navigate("/policy");
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <footer className="bg-black text-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center">
            <div className="my-auto">
              <p className="text-center">
                © 2023. All rights reserved.
                <span
                  onClick={handleClickTerms}
                  className="text-[#f2c426] hover:underline mx-1 cursor-pointer"
                >
                  Terms and Conditions
                </span>
                |
                <span
                  onClick={handleClickPolicy}
                  className="text-[#f2c426] hover:underline mx-1 cursor-pointer"
                >
                  Disclaimer & Privacy Policy
                </span>
              </p>
            </div>
            <div>
              {/* Additional footer content can be placed here if needed */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
