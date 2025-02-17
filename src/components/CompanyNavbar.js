import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const CompanyNavbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Getting details of the logged in user

  // const [userDetails, setUserDetails] = useState(null); // State to store user details

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       // Retrieve token from localStorage
  //       const token = localStorage.getItem("token");

  //       if (!token) {
  //         throw new Error("No token found in localStorage");
  //       }

  //       // Make the API call to get user details using the token
  //       const response = await fetch("http://localhost:2000/auth/getuser", {
  //         method: "POST",
  //         headers: {
  //           "auth-token": `${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user details");
  //       }

  //       // Parse the response and update state with user data
  //       const data = await response.json();
  //       setUserDetails(data);
  //       console.log(data); // Store user data in state
  //     } catch (err) {
  //       // Handle error and update state
  //       console.error("Error fetching user details:", err);
  //       // Store error message
  //     }
  //   };

  //   fetchUserDetails();
  // }, []);

  //-----------------------------

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            IF Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/companyHome">
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") && (
                // <li class="nav-item dropdown">
                //   <a
                //     class="nav-link dropdown-toggle"
                //     href="/"
                //     role="button"
                //     data-bs-toggle="dropdown"
                //     aria-expanded="false"
                //   >
                //     Dashboard
                //   </a>
                //   <ul class="dropdown-menu">
                //     <li>
                //       <Link to="/form" class="dropdown-item">
                //         Application Form
                //       </Link>
                //     </li>
                //     <li>
                //       <hr class="dropdown-divider" />
                //     </li>
                //     <li>
                //       <Link class="dropdown-item" to="/submittedForm">
                //         Internships Applied
                //       </Link>
                //     </li>
                //   </ul>
                // </li>
                <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/companyPage">
                        Applications
                    </Link>
                </li>
              )}
            </ul>
            {/* {localStorage.getItem("token") && userDetails && (
              <div className="text-light mx-2">Hi {userDetails.name}</div>
            )} */}
            {!localStorage.getItem("token") ? (
              <div>
               
                  <button type="button" className="btn btn-light mx-1" data-bs-toggle="modal"
                  data-bs-target="#signupModal">
                    SignUp
                  </button>
                

                <button
                  type="button"
                  className="btn btn-light mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                type="button"
                className="btn btn-light mx-1"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>







{/* login modal */}
      <div
        class="modal fade"
        id="loginModal"
        tabindex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="loginModalLabel">
                Login
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Login />
            </div>
          </div>
        </div>
      </div>






{/* SignUp Modal */}

<div
        class="modal fade"
        id="signupModal"
        tabindex="-1"
        aria-labelledby="signupModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="signupModalLabel">
                Sign Up
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Signup/>
            </div>
          </div>
        </div>
      </div>





      
    </>
  );
};

export default CompanyNavbar;
