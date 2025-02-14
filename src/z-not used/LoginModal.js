import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const LoginModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleIconClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsRegisterMode(false); // Reset to login mode when modal is closed
    };

    return (
        <div className="ml-4 flex items-center">
            <FaUserCircle
                className="text-3xl text-gray-300 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer"
                onClick={handleIconClick}
                title="Login or Register"
            />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md relative shadow-lg">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                            {isRegisterMode ? "Register" : "Login"}
                        </h2>

                        {/* Login Form */}
                        {!isRegisterMode && (
                            <form>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded shadow-md transition-transform transform hover:scale-105"
                                >
                                    Login
                                </button>
                            </form>
                        )}

                        {/* Register Form */}
                        {isRegisterMode && (
                            <form>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Branch (e.g., CSE, ECE)"
                                    className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow-md transition-transform transform hover:scale-105"
                                >
                                    Register
                                </button>
                            </form>
                        )}

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            {isRegisterMode
                                ? "Already have an account?"
                                : "Don’t have an account?"}{" "}
                            <button
                                className="text-blue-500 dark:text-blue-400 hover:underline"
                                onClick={() => setIsRegisterMode(!isRegisterMode)}
                            >
                                {isRegisterMode ? "Login here" : "Register here"}
                            </button>
                        </p>

                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginModal;
