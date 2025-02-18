import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Building,
  UserPlus,
  LogIn,
} from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dashboard-dropdown")) {
        setIsDashboardOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            className="text-2xl font-bold tracking-tight hover:text-blue-400 transition-colors"
            to="/"
          >
            IF Portal
          </Link>

          <button
            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link className="hover:text-blue-400 transition-colors" to="/">
              Home
            </Link>

            {localStorage.getItem("token") && (
              <div className="relative dashboard-dropdown">
                <button
                  className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                  onClick={toggleDashboard}
                >
                  <span>Dashboard</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isDashboardOpen && (
                  <div className="absolute right-0 bg-white text-gray-900 shadow-xl rounded-lg mt-2 w-48 overflow-hidden transition-all duration-200 ease-in-out z-50">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/form"
                          className="flex px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsDashboardOpen(false)}
                        >
                          Application Form
                        </Link>
                      </li>
                      <li className="border-t border-gray-200">
                        <Link
                          to="/submittedForm"
                          className="flex px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsDashboardOpen(false)}
                        >
                          Internships Applied
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {!localStorage.getItem("token") ? (
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsSignupModalOpen(true)}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>

                <button
                  type="button"
                  className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>

                <Link to="/companyLogin">
                  <button
                    type="button"
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Building className="w-4 h-4" />
                    <span>Company Login</span>
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                type="button"
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 text-white p-4 space-y-4">
            <Link
              className="block hover:text-blue-400 transition-colors pb-2"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {localStorage.getItem("token") && (
              <>
                <Link
                  className="block hover:text-blue-400 transition-colors pb-2"
                  to="/form"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Application Form
                </Link>
                <Link
                  className="block hover:text-blue-400 transition-colors pb-2"
                  to="/submittedForm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Internships Applied
                </Link>
              </>
            )}

            {!localStorage.getItem("token") ? (
              <div className="flex flex-col space-y-3">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => {
                    setIsSignupModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>

                <Link
                  to="/companyLogin"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
                  >
                    <Building className="w-4 h-4" />
                    <span>Company Login</span>
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                type="button"
                className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-xl font-semibold text-gray-900">Login</h1>
              <button
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsLoginModalOpen(false)}
              >
                <X className="w-5 h-5" />
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-xl font-semibold text-gray-900">Sign Up</h1>
              <button
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsSignupModalOpen(false)}
              >
                <X className="w-5 h-5" />
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
