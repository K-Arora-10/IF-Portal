import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      let filledFields = document.querySelectorAll(
        "input:not([disabled]):valid, select:valid"
      ).length;
      let totalFields = document.querySelectorAll(
        "input:not([disabled]), select"
      ).length;
      let newProgress = Math.min(
        100,
        Math.max(20, (filledFields / totalFields) * 100)
      );
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
      setFormData({
        phone: "",
        roll: "",
        year: "",
        branch: "",
        company: "",
        role: "",
        resume: "",
      });
      setSelectedCompany("");
      setRoles([]);
      setProgress(20);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Internship Application
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={userDetails.name}
              disabled
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={userDetails.email}
              disabled
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Roll Number</label>
            <input
              type="text"
              name="roll"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.roll}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Year</label>
            <select
              name="year"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Year --</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Branch</label>
            <input
              type="text"
              name="branch"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Company</label>
            <select
              name="company"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={selectedCompany}
              onChange={handleCompanyChange}
              required
            >
              <option value="">-- Select a Company --</option>
              {Object.keys(companyRoles).map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Role</label>
            <select
              name="role"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.role}
              onChange={handleChange}
              disabled={!selectedCompany}
              required
            >
              <option value="">-- Select a Role --</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium">Resume Drive Link</label>
            <input
              type="text"
              name="resume"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={formData.resume}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors w-1/2"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
