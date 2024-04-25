import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };
  const toggleLogout = () => {
    setIsLogout((prevIsLogout) => !prevIsLogout);
  };

  return (
    <nav className="flex items-center justify-between gradient p-4 z-40">
      <div className="flex items-center space-x-9">
        <div className="flex items-center space-x-3">
          <div className="flex">
            <h3 className="text-white xl:text-xl hidden xl:block">Event</h3>
          </div>
        </div>
      </div>

      <div>
        <div className="xl:hidden">
          <button
            className="text-white font-work-sans text-2xl "
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            Menu
          </button>
        </div>

        <div
          data-testid="menu"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } xl:flex items-center text-white cursor-pointer list-none gradient transition-all ease-in-out duration-300 xl:space-x-4 xl:ml-3 absolute left-0 w-full xl:w-auto xl:static xl:h-auto xl:bg-transparent mt-6 xl:mt-0 xl:ml-0`}
        >
          <li className="y-6 xl:my-0 ml-2 mr-4 my-6">
            <Link
              to="/admin/dashboard"
              className={`my-6 xl:my-0 no-underline text-white ml-2 mr-4 ${
                location.pathname === "/buyerDash" ? "border-b-2 pb-2" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="y-6 xl:my-0 ml-4 my-8 ">
            <Link
              to="/admin/student"
              className={`my-6 xl:my-0 no-underline text-white mr-4 ${
                location.pathname === "/admin/student" ? "border-b-2 pb-2" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Booking
            </Link>
          </li>
        </div>
      </div>

      <div className="flex items-center space-x-4 ml-3">
        <h3
          className="text-white cursor-pointer border border-white px-2 py-2 rounded-lg"
          onClick={toggleLogout}
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="mr-2 ml-2"
            style={{ color: "#f7f7f8" }}
          />
          Logout
        </h3>
      </div>
    </nav>
  );
};

export default NavBar;
