import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const navItems = [
    { name: "HOME", path: "/#home" },
    { name: "PRICE OVERVIEW", path: "/#price-overview" },
    { name: "GALLERY", path: "/#gallery" },
    { name: "AMENITIES", path: "/#amenities" },
    { name: "VIRTUAL TOUR", path: "/#virtual-tour" },
    { name: "CONTACT US", path: "/#contact-us" },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-md z-10 w-full">
      <div className="w-full px-4">
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center space-x-2">
            <MdMenu size={30} className="md:hidden" onClick={toggleNav} />

            <MdMenu
              size={30}
              className="hidden md:block cursor-pointer"
              onClick={() => (window.location.href = "/")}
            />

            <h2 className="text-xl font-bold md:text-lg lg:text-3xl">
              ARIHANT ANAIKA, TALOJA
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex lg:space-x-6 md:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                smooth
                to={item.path}
                className="text-gray-600 hover:underline hover:text-black transition duration-200 text-sm md:text-xs lg:text-sm pb-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            type="button"
            className="md:block lg:hidden focus:outline-none"
            onClick={toggleNav}
            aria-label="Toggle navigation"
          ></button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white shadow-lg transition duration-300 ease-in-out z-20 md:hidden`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={closeNav} className="focus:outline-none">
                <MdClose size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-gray-600"
                  onClick={closeNav}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {navOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={closeNav}
        ></div>
      )}
    </header>
  );
};

export default NavBar;
