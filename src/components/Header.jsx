import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuHidden, setMenuHidden] = useState(true);
  const [activeLink, setActiveLink] = useState(null);

  const toggleMenu = () => {
    setMenuHidden(!isMenuHidden);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <nav className="bg-gray-200 fixed w-screen">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <a 
                  href="#"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <span className="font-bold">Do</span>
                </a>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/home"
                  className={activeLink === "home" ? "font-bold py-5 px-3 text-violet-700 hover:text-violet-700 underline" : "font-thin py-5 px-3 text-gray-700 hover:text-violet-700 no-underline	"}
                  onClick={() => handleLinkClick("home")}
                >
                  Home
                </Link>
                <Link
                  to="/aboutUs"
                  className={activeLink === "about" ? "font-bold py-5 px-3 text-violet-700 hover:text-violet-700 underline" : "font-thin py-5 px-3 text-gray-700 hover:text-violet-700 no-underline	"}
                  onClick={() => handleLinkClick("about")}
                >
                  About
                </Link>
                <Link
                  to="/contactUs"
                  className={activeLink === "contact" ? "font-bold py-5 px-3 text-violet-700 hover:text-violet-700 underline" : "font-thin py-5 px-3 text-gray-700 hover:text-violet-700 no-underline	"}
                  onClick={() => handleLinkClick("contact")}
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-5 px-3">
                Login
              </Link>
              <Link
                to="/signUp"
                className="py-2 px-3 bg-violet-200 hover:Violet-400 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
              >
                Signup
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button" onClick={toggleMenu}>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`mobile-menu ${isMenuHidden ? "hidden" : ""}`}>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
            Home
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
            About
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
            Contact
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
            Login
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
            Signup
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
