// import logo from './logo.svg';
import { Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/navbar";
import Form from "./components/Form";
// import { useNavigate } from "react-router-dom";
// import Home from "./components/Home";
import { Routes, Route, BrowserRouter } from "react-router";
import SubmittedForms from "./components/SubmittedForms";
import CompanyForms from "./components/companyForms";
import CompanyLogin from "./components/companyLogin";
import CompanyHome from "./components/CompanyHome";
import CompanyNavbar from "./components/CompanyNavbar";
import ParticlesDemo from "./components/particles";
import { useEffect,useState } from 'react';
import { ToastContainer } from "react-toastify";

function App() {

  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  // Update userRole when it changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("userRole"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
    
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              userRole === "company" ? (
                <Navigate to="/companyHome" replace />
              )
               : (
                <>
                <Navbar />
                <ParticlesDemo />
                </>
              )
            }
          />
          <Route path="/login" element={
            userRole === "company" ? (
              <Navigate to="/companyHome" replace />
            ):
            userRole === "student" ? (
              <Navigate to="/" replace />
            ) : (
            <Login />)} />
          <Route path="/signup" element={
            userRole === "company" ? (
              <Navigate to="/companyHome" replace />
            ):
            userRole === "student" ? (
              <Navigate to="/" replace />
            ) : (
            <Signup />)} />
          <Route
            path="/form"
            element={userRole === "company" ? (
              <Navigate to="/companyHome" replace />
            ) : (
              <>
                <Navbar />
                <Form />
              </>)
            }
          />
          <Route
            path="/submittedForm"
            element={userRole === "company" ? (
              <Navigate to="/companyHome" replace />
            ) : (
              <>
                <Navbar />
                <SubmittedForms />
              </>)
            }
          />
          <Route
            path="/companyPage"
            element={
              userRole === "student" ? (
                <Navigate to="/" replace />
              ) : (
              <>
                <CompanyNavbar />
                <CompanyForms />
              </>)
            }
          />
          <Route
            path="/companyLogin"
            element={
              userRole === "company" ? (
                <Navigate to="/companyHome" replace />
              ):
              userRole === "student" ? (
                <Navigate to="/" replace />
              ) : (
              <>
                <Navbar />
                <CompanyLogin />
              </>)
            }
          />
          <Route
            path="/companyHome"
            element={userRole === "student" ? (
              <Navigate to="/" replace />
            ) : (
              <>
                <CompanyNavbar />
                <CompanyHome />
              </>)
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
