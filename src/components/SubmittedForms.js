import React, { useState, useEffect } from "react";
import SubmittedFormsCard from "./SubmittedFormsCard";

const SubmittedForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch("http://localhost:2000/form/getAllFilledForms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }

        const data = await response.json();
        setForms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Submitted Forms</h2>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse text-lg">Loading...</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-600 font-semibold bg-red-100 p-3 rounded-lg">
          Error: {error}
        </p>
      )}

      {/* No Forms Found */}
      {!loading && !error && forms.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No submitted forms found.</p>
      )}

      {/* Forms Grid */}
      {!loading && !error && forms.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {forms.map((form, index) => (
            <SubmittedFormsCard
              key={index}
              company={form.company}
              roll={form.roll}
              year={form.year}
              branch={form.branch}
              role={form.role}
              resume={form.resume}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedForms;