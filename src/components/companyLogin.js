import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Building, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CompanyLogin = () => {
  let navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch(
        "https://if-portal-backend.onrender.com/authCompany/companyLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const json = await response.json();

      if (json.success) {
        toast.success("Login Successful");
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("userRole", "company");
        

        setTimeout(() => {
          window.dispatchEvent(new Event("storage")); // 🔄 Force update in App.js
          navigate("/companyHome", { replace: true });
        }, 100);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Building className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Company Login
          </h2>
          <p className="text-sm text-gray-500">
            Access your company dashboard and manage internships
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Mail className="w-4 h-4" />
              Company Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="company@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
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
            Sign in to Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This portal is exclusively for registered companies.
            <br />
            Students should use the regular login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
