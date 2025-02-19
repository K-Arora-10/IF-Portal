import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

const CompanyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  
    // ✅ Dispatch storage event to update userRole in App.js
    window.dispatchEvent(new Event("storage"));
  
    // ✅ Use setTimeout to ensure the state updates before redirection
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            className="text-2xl font-bold tracking-tight hover:text-blue-400 transition-colors"
            to="/companyHome"
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
            <Link 
              className="hover:text-blue-400 transition-colors" 
              to="/companyHome"
            >
              Home
            </Link>
            <Link 
              className="hover:text-blue-400 transition-colors" 
              to="/companyPage"
            >
              Received Applications
            </Link>
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 text-white p-4 space-y-4">
            <Link
              className="block hover:text-blue-400 transition-colors pb-2"
              to="/companyHome"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className="block hover:text-blue-400 transition-colors pb-2"
              to="/companyPage"
              onClick={() => setIsMenuOpen(false)}
            >
              Received Applications
            </Link>
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
          </div>
        )}
      </nav>
    </>
  );
};

export default CompanyNavbar;