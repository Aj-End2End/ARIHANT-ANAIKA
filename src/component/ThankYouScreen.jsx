import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const ThankYouScreen = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden form_submit">
      <img
        src="images\THANK YOU PAGE.jpg"
        alt="Thank You"
        className="w-full h-full"
      />
      <Link
        to="/"
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-transparent text-black px-6 py-3 rounded-md font-bold border-3 border-black"
      >
        Home
      </Link>
    </div>
  );
};

export default ThankYouScreen;
