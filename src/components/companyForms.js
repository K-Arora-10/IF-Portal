import React,{useState,useEffect} from "react";
import CompanyFormsCard from "./CompanyFormsCard";

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
      <div className="container mt-4">
        <button type="button" class="btn btn-primary">
          Total Application <span class="badge text-bg-secondary">{forms.length}</span>
        </button>

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
    </>
  );
};

export default CompanyForms;
