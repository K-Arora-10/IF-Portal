import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ParticlesDemo } from "./components/particles";
import Navbar from "./components/navbar";
import PageResume from "./c-Submitted-resume/page-resume";
import Submit from "./c-submit-resume/page-submit";
import LoginSignup from "./login-signup/login";
import CompanyDashboard from "./company_dasboard/dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Auth handler function
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ParticlesDemo />} />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginSignup onAuthSuccess={handleAuthSuccess} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/submit-resume"
            element={
              <ProtectedRoute>
                <PageResume />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-page"
            element={
              <ProtectedRoute>
                <Submit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company"
            element={
              <ProtectedRoute>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;