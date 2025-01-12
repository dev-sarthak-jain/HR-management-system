import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons from react-icons library
import MenuItem from "./MenuItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./../store/auth/selectors";
import { signout } from "../store/auth/action";
import logo from "../assets/img/company.png"

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isChatRoute = location.pathname.includes("chat");
  const user = useSelector(getUser);

  const handleClick = () => {
    dispatch(signout({ navigate }));
  };

  const menuItems = user ? [
    { link: "/signup", title: "Sign Up" },
  ] : [
    { link: "/", title: "Home" },
    { link: "/signup", title: "Sign Up" },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  if (isChatRoute) {
    return null; // Return null to hide the header
  }

  return (
    <div>
      <header className="p-2 sm:px-4 lg:p-2 flex justify-between bg-transparent text-white sticky top-0 z-50 lg:mx-24 lg:pl-8">
        {/* CHILD 1 */}
        {!user ? (
          <Link
            to="/signin"
            className="my-2 p-2 lg:my-0 order-3 font-nunito text-sm sm:text-lg lg:font-bold lg:bg-[#868BC7] sm:p-3 text-white lg:w-28 lg:h-24 justify-center items-center flex lg:absolute lg:right-0.5 rounded-b-lg"
          >
            Sign in
          </Link>
        ) : (
          <button
            onClick={handleClick}
            className="my-2 p-2 lg:my-0 order-3 font-nunito text-sm sm:text-lg lg:font-bold bg-[#212530] sm:p-3 text-white lg:w-28 lg:h-24 justify-center items-center flex lg:absolute lg:right-0.5 rounded-b-lg"
          >
            Sign Out
          </button>
        )}
        {/* CHILD 2 */}
        <div className="order-2 ml-2 lg:mx-16 xl:mx-28 flex flex-wrap items-center justify-between md:justify-start">
          <div className="flex items-center space-x-4">
            {/* Add your logo here */}
            <Link to="/" className="flex items-center my-4">
              <img
                src={logo}
                alt="Logo"
                className="h-6 lg:h-16 scale-105"
              />
            </Link>
            <ul className="hidden lg:flex items-center">
              {menuItems.slice(0, -1).map((item, index) => (
                <MenuItem key={index} {...item} />
              ))}
            </ul>
          </div>
          {user ? (
            ""
          ) : (
            <ul className="hidden lg:flex items-center ml-auto">
              {/* The last two menu items */}
              {menuItems.slice(-1).map((item, index) => (
                <MenuItem
                  key={index}
                  {...item}
                  isLast={index === menuItems.slice(-1).length - 1}
                />
              ))}
            </ul>
          )}
        </div>
        {/* CHILD 3 MOBILE */}
        {/* Mobile menu (hidden on desktop) */}
        <div className="order-1 lg:hidden">
          <button
            onClick={handleMobileMenuToggle}
            className="my-5 px-2 sm:my-8 lg:my-0 text-white hover:text-gray-300"
          >
            <FaBars className="text-xl" /> {/* Open side bar mobile icon */}
          </button>
        </div>
      </header>

      {/* LEFT SIDE BAR */}
      {/* Mobile menu (hidden on desktop) */}
      {isMobileMenuOpen && (
        <div className="backdrop-blur-md w-full h-full z-[99] fixed top-0 right-0">
          <ul className={`space-y-4 pt-8 px-2.5 bg-[#284B63] text-white fixed top-0 left-0 w-[80%] sm:w-[50%] shadow-md h-full transition-transform ease-in-out duration-1000 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0 lg:w-auto`}>
            {menuItems.slice(0, -1).map((item, index) => (
              <MenuItem linkClicked={handleMobileMenuToggle} key={index} {...item} />
            ))}
          </ul>
          {/* Close icon */}
          <FaTimes onClick={handleMobileMenuToggle}
            className="absolute left-[81%] sm:left-[51%] z-[99] top-4 text-chatTipBackground text-2xl" />
        </div>
      )}
      {/* LEFT SIDE BAR END */}
    </div>
  );
};

export default Header;
