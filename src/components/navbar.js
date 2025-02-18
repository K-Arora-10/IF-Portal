import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link className="text-2xl font-bold" to="/">
            IF Portal
          </Link>

          <button
            className="lg:hidden block text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link className="hover:text-gray-300" to="/">
              Home
            </Link>

            {localStorage.getItem("token") && (
              <div className="relative group">
                <button className="hover:text-gray-300">Dashboard</button>
                <div className="hidden group-hover:block absolute bg-white text-gray-900 shadow-md rounded-md mt-2">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/form"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Application Form
                      </Link>
                    </li>
                    <li>
                      <hr className="border-gray-300" />
                    </li>
                    <li>
                      <Link
                        to="/submittedForm"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Internships Applied
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {!localStorage.getItem("token") ? (
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md"
                  onClick={() => setIsSignupModalOpen(true)}
                >
                  Sign Up
                </button>

                <button
                  type="button"
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>

                <Link to="/companyLogin">
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md"
                  >
                    Company Login
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                type="button"
                className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 text-white p-4 space-y-4">
            <Link className="block hover:text-gray-300 pb-2" to="/">
              Home
            </Link>

            {localStorage.getItem("token") && (
              <>
                <Link className="block hover:text-gray-300 pb-2" to="/form">
                  Application Form
                </Link>
                <Link
                  className="block hover:text-gray-300 pb-2"
                  to="/submittedForm"
                >
                  Internships Applied
                </Link>
              </>
            )}

            {!localStorage.getItem("token") ? (
              <div className="flex flex-col space-y-3">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md w-full"
                  onClick={() => setIsSignupModalOpen(true)}
                >
                  Sign Up
                </button>

                <button
                  type="button"
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md w-full"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>

                <Link to="/companyLogin" className="w-full">
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md w-full"
                  >
                    Company Login
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                type="button"
                className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md w-full"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b">
              <h1 className="text-lg font-semibold">Login</h1>
              <button
                className="text-gray-500 hover:text-gray-700 float-right"
                onClick={() => setIsLoginModalOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="p-4">
              <Login />
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b">
              <h1 className="text-lg font-semibold">Sign Up</h1>
              <button
                className="text-gray-500 hover:text-gray-700 float-right"
                onClick={() => setIsSignupModalOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="p-4">
              <Signup />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
