"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Importing a user icon from react-icons

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-neutral-300 hover:opacity-[0.9] dark:text-neutral-200"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-neutral-900 dark:bg-neutral-800 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-700 shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-neutral-700 bg-neutral-900 shadow-lg flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link to={href} className="flex space-x-2">
      <img
        src={src}
        alt={title}
        className="w-36 h-36 flex-shrink-0 rounded-md shadow-md object-cover"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-neutral-200">
          {title}
        </h4>
        <p className="text-neutral-400 text-sm max-w-[10rem]">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...props }) => {
  return (
    <Link
      {...props}
      className="text-neutral-400 hover:text-neutral-200"
    >
      {children}
    </Link>
  );
};

// Adding a Login Menu Item with an Icon
export const LoginMenuItem = ({ setActive }) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <FaUserCircle size={24} className="text-neutral-200" />
      <p
        onMouseEnter={() => setActive("login")}
        className="text-neutral-200 hover:opacity-[0.9]"
      >
        Login
      </p>
    </div>
  );
};
