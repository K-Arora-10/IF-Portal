import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Form = () => {
  let navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [selectedCompany, setSelectedCompany] = useState("");
  const [roles, setRoles] = useState([]);
  const [progress, setProgress] = useState(20);
  const [formData, setFormData] = useState({
    phone: "",
    roll: "",
    year: "",
    branch: "",
    company: "",
    role: "",
    resume: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:2000/auth/getuser", {
          method: "POST",
          headers: { "auth-token": token },
        });

        if (!response.ok) throw new Error("Failed to fetch user details");

        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const companyRoles = {
    "Company A": ["Role 1", "Role 2"],
    "Company B": ["Role 3", "Role 4"],
    "Company C": ["Role 5", "Role 6"],
  };

  const handleCompanyChange = (e) => {
    const company = e.target.value;
    setSelectedCompany(company);
    setRoles(companyRoles[company] || []);
    setFormData((prev) => ({ ...prev, company, role: "" }));
    updateProgress();
  };

  const updateProgress = () => {
    setTimeout(() => {
      let filledFields = document.querySelectorAll("input:not([disabled]):valid, select:valid").length;
      let totalFields = document.querySelectorAll("input:not([disabled]), select").length;
      let newProgress = Math.min(100, Math.max(20, (filledFields / totalFields) * 100));
      setProgress(newProgress);
    }, 100);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    updateProgress();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      name: userDetails.name,
      email: userDetails.email,
    };
    
    const response = await fetch("http://localhost:2000/form/fillForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });

    const json = await response.json();
    if (json.success) {
      alert("Application Submitted Successfully");
      setFormData({ phone: "", roll: "", year: "", branch: "", company: "", role: "", resume: "" });
      setSelectedCompany("");
      setRoles([]);
      setProgress(20);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Internship Application</h2>
        <div className="progress mb-3">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <form onSubmit={handleSubmit} className="row g-3" onChange={updateProgress}>
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={userDetails.name} disabled required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={userDetails.email} disabled required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" className="form-control" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Roll Number</label>
            <input type="text" name="roll" className="form-control" value={formData.roll} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Year</label>
            <select name="year" className="form-control" value={formData.year} onChange={handleChange} required>
              <option value="">-- Select Year --</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Branch</label>
            <input type="text" name="branch" className="form-control" value={formData.branch} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Company</label>
            <select name="company" className="form-control" value={selectedCompany} onChange={handleCompanyChange} required>
              <option value="">-- Select a Company --</option>
              {Object.keys(companyRoles).map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Role</label>
            <select name="role" className="form-control" value={formData.role} onChange={handleChange} disabled={!selectedCompany} required>
              <option value="">-- Select a Role --</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label">Resume Drive Link</label>
            <input type="text" name="resume" className="form-control" value={formData.resume} onChange={handleChange} required />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary w-50">Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;