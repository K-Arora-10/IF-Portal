import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
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
