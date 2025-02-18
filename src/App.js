// import logo from './logo.svg';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/navbar";
import Form from "./components/Form";
// import Home from "./components/Home";
import { Routes, Route, BrowserRouter } from "react-router";
import SubmittedForms from "./components/SubmittedForms";
import CompanyForms from "./components/companyForms";
import CompanyLogin from "./components/companyLogin";
import CompanyHome from "./components/CompanyHome";
import CompanyNavbar from "./components/CompanyNavbar";
import ParticlesDemo from "./components/particles";
// import { useEffect } from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <ParticlesDemo />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/form"
            element={
              <>
                <Navbar />
                <Form />
              </>
            }
          />
          <Route
            path="/submittedForm"
            element={
              <>
                <Navbar />
                <SubmittedForms />
              </>
            }
          />
          <Route
            path="/companyPage"
            element={
              <>
                <CompanyNavbar />
                <CompanyForms />
              </>
            }
          />
          <Route
            path="/companyLogin"
            element={
              <>
                <Navbar />
                <CompanyLogin />
              </>
            }
          />
          <Route
            path="/companyHome"
            element={
              <>
                <CompanyNavbar />
                <CompanyHome />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
