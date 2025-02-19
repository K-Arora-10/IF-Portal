import React, { useState, useEffect } from "react";

const FloatingInput = ({ label, value, onChange, type = "text", disabled = false, required = true, pattern, name }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        className={`peer w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'focus:border-blue-500'}
          ${(isFocused || value) ? 'pt-6 pb-2' : 'pt-3 pb-3'}
          outline-none`}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        required={required}
        pattern={pattern}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none
          ${(isFocused || value) 
            ? 'text-xs text-blue-600 top-1' 
            : 'text-gray-500 top-3'}
          ${disabled ? 'text-gray-400' : ''}
        `}
      >
        {label}
      </label>
    </div>
  );
};

const FloatingSelect = ({ label, value, onChange, options, disabled = false, required = true, name }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative">
      <select
        name={name}
        className={`peer w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'focus:border-blue-500'}
          ${(isFocused || value) ? 'pt-6 pb-2' : 'pt-3 pb-3'}
          outline-none appearance-none`}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        required={required}
      >
        <option value="">{}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none
          ${(isFocused || value) 
            ? 'text-xs text-blue-600 top-1' 
            : 'text-gray-500 top-3'}
          ${disabled ? 'text-gray-400' : ''}
        `}
      >
        {label}
      </label>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
      text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out z-50 flex items-center gap-2`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:text-gray-200">×</button>
    </div>
  );
};

const Form = () => {
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [selectedCompany, setSelectedCompany] = useState("");
  const [roles, setRoles] = useState([]);
  const [progress, setProgress] = useState(20);
  const [toast, setToast] = useState(null);
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
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("http://localhost:2000/auth/getuser", {
          method: "POST",
          headers: { "auth-token": token },
        });

        if (!response.ok) throw new Error("Failed to fetch user details");

        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        showToast("Error fetching user details", "error");
      }
    };
    fetchUserDetails();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const companyRoles = {
    "Company A": ["Role 1", "Role 2"],
    "Company B": ["Role 3", "Role 4"],
    "Company C": ["Role 5", "Role 6"],
  };

  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
  ];

  const companyOptions = Object.keys(companyRoles).map(company => ({
    value: company,
    label: company
  }));

  const roleOptions = roles.map(role => ({
    value: role,
    label: role
  }));

  const handleCompanyChange = (e) => {
    const company = e.target.value;
    setSelectedCompany(company);
    setRoles(companyRoles[company] || []);
    setFormData(prev => ({ ...prev, company, role: "" }));
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
    try {
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
        showToast("Application Submitted Successfully");
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
      } else {
        showToast("Submission failed. Please try again.", "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <h2 className="text-3xl font-bold text-center">
              Internship Application
            </h2>
            <p className="text-center mt-2 text-blue-100">
              Fill in your details to apply
            </p>
          </div>
          
          <div className="px-6 py-6">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingInput
                  label="Full Name"
                  name="name"
                  value={userDetails.name}
                  onChange={() => {}}
                  disabled
                />

                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={() => {}}
                  disabled
                />

                <FloatingInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <FloatingInput
                  label="Roll Number"
                  name="roll"
                  value={formData.roll}
                  onChange={handleChange}
                />

                <FloatingSelect
                  label="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  options={yearOptions}
                />

                <FloatingInput
                  label="Branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                />

                <FloatingSelect
                  label="Company"
                  name="company"
                  value={selectedCompany}
                  onChange={handleCompanyChange}
                  options={companyOptions}
                />

                <FloatingSelect
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={roleOptions}
                  disabled={!selectedCompany}
                />
              </div>

              <FloatingInput
                label="Resume Drive Link"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
              />

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;