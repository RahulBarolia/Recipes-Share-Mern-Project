import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";
import { MdDarkMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function signout() {
    logout();
    navigate("/login");
  }

  const handleAddRecipeClick = () => {
    if (user) {
      navigate("/addrecipes");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="w-full h-[10vh] relative shadow-md bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="mx-auto flex justify-between items-center h-full px-4">
        <h1
          className="text-2xl font-bold cursor-pointer flex items-center"
          onClick={() => (user ? navigate("/") : navigate("/login"))}
        >
          <span className="text-blue-500 dark:text-blue-300 text-3xl mr-1">
            R
          </span>
          ecipes
        </h1>

        <div className="flex items-center space-x-6">
          <div
            className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-300 dark:text-white transition-colors duration-500"
            onClick={handleAddRecipeClick}
          >
            <CiSquarePlus size={40} />
          </div>

          <div
            onClick={() => toggleDarkMode()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded cursor-pointer"
          >
            {isDarkMode ? <CiDark size={15} /> : <MdDarkMode size={15} />}
          </div>

          <div className="hidden md:flex">
            {user ? (
              <div className="flex space-x-4">
                <div className="flex items-center justify-center space-x-2 dark:bg-gray-800 px-2 py-1 rounded hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-500 ">
                  <FaBookOpen size={20} />
                  <Link to="/myRecipes" className="text-xl font-semibold  ">
                    Recipes
                  </Link>
                </div>

                <button
                  className="w-full text-xl px-2 py-1 rounded font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-500 dark:bg-gray-800 "
                  onClick={function handleLogout() {
                    signout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-lg font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-500"
              >
                Login
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <GiHamburgerMenu
              size={30}
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hamburger Dropdown) */}
      {isMenuOpen && (
        <div className="lg:hidden h-[12vh]  w-full absolute shadow-md dark:bg-gray-800 dark:border-t-gray-800 transition-transform duration-700 dark:shadow-md">
          <div className="w-full flex flex-col absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-70 z-10 justify-center">
            {user ? (
              <div className="h-full text-center">
                <button
                  className="w-full text-xl p-2 font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-500  "
                  onClick={function handleLogout() {
                    signout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>

                <div className="flex justify-center items-center space-x-1 ">
                  <FaBookOpen size={25} />
                  <Link
                    to="/myRecipes"
                    className="text-xl p-2 font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-500 text-center"
                    onClick={() => setIsMenuOpen(false)} // Close menu after clicking
                  >
                    My Recipes
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="w-full py-2 text-xl font-semibold hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-500 text-center"
                onClick={() => setIsMenuOpen(false)} // Close menu after clicking
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
