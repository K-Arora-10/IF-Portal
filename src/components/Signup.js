import React, { useState } from "react";
import { UserPlus, Mail, Lock, User, X } from "lucide-react";
import { toast } from "react-toastify";

const Signup = ({ onClose }) => {
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password,
    };

    try {
      const response = await fetch("https://if-portal-backend.onrender.com/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (json.success) {
        toast.success("SignUp Successful");
        if (onClose) {
          setTimeout(() => {
            onClose(); // Close modal after signup
          }, 100);
        }
      } else {
        toast.error(json.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-500">
          Sign up to get started with your new account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <User className="w-4 h-4" />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Lock className="w-4 h-4" />
            Create Password (At least 6 characters)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a strong password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            minLength="6"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirm-password"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Lock className="w-4 h-4" />
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Re-enter password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            minLength="6"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          <UserPlus className="w-4 h-4" />
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
