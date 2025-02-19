import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const SubmittedFormsCard = ({ company, role, roll, year, branch, resume }) => {
  return (
    <div className="shadow-2xl border border-gray-200 rounded-3xl overflow-hidden w-full max-w-lg bg-white hover:shadow-md transition-all duration-300">
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h5 className="text-2xl font-bold">{company}</h5>
        <p className="text-md">{role}</p>
      </div>

      <div className="p-6 space-y-5">
        <div className="border-t border-gray-300 pt-4 space-y-3 text-gray-800">
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Roll No:</span> <span>{roll}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Year:</span> <span>{year}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Branch:</span> <span>{branch}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Resume:</span>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 flex items-center gap-1 font-semibold transition duration-300"
            >
              View <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
        </div>

        {/* Button */}
        
      </div>
    </div>
  );
};

export default SubmittedFormsCard;
