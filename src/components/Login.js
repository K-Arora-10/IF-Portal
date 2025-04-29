import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = ({ onClose }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("https://if-portal-backend.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();

      if (json.success) {
        toast.success("Login Successful");
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("userRole", "student");

        setTimeout(() => {
          window.dispatchEvent(new Event("storage")); // 🔄 Force update in App.js
          navigate("/", { replace: true });
        }, 100);
        if (onClose) {
          setTimeout(() => {
            onClose(); // Close modal after login
          }, 100);
        }
        
      }
      else{
        toast.error(json.error)
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="relative bg-white rounded-lg">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      )}
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail className="w-4 h-4" />
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock className="w-4 h-4" />
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          <LogIn className="w-4 h-4" />
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;