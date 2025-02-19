import React,{useState,useEffect} from "react";
import CompanyFormsCard from "./CompanyFormsCard";
import SubmittedFormsCard from "./SubmittedFormsCard";

const CompanyForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(
          "http://localhost:2000/form/getAllForms",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"), // Assuming token is stored in localStorage
            },
          }
        );

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container mx-auto p-6">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Received Applications</h2>


      <div className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
        <div className="text-center text-white">
          <p className="text-lg font-medium mb-2">Total Applications Received</p>
          <div className="text-5xl font-bold">{forms.length}</div>
        </div>
      </div>

      

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
            <CompanyFormsCard
            key={index}
            company={form.name}
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
    </>
  );
};

export default CompanyForms;
