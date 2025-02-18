import React from "react";

const SubmittedFormsCard = (props) => {
  return (
    <>
      <div className="border border-gray-300 rounded-lg shadow-md my-4">
        <div className="p-4">
          <h5 className="text-lg font-bold">{props.company}</h5>
          <p className="text-gray-700">{props.role}</p>
        </div>
        <ul className="border-t border-gray-300 divide-y divide-gray-200">
          <li className="px-4 py-2">Roll No - {props.roll}</li>
          <li className="px-4 py-2">Year - {props.year}</li>
          <li className="px-4 py-2">Branch - {props.branch}</li>
          <li className="px-4 py-2">Resume Link - {props.resume}</li>
        </ul>
        {/* <div className="p-4">
          <a href="#" className="text-blue-500 hover:underline">
            Card link
          </a>
          <a href="#" className="text-blue-500 hover:underline ml-4">
            Another link
          </a>
        </div> */}
      </div>
    </>
  );
};

export default SubmittedFormsCard;
