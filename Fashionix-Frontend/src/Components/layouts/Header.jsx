import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import Modal from "react-modal"
import Register from "../auth/Register"
import Swal from "sweetalert2"
import { NavLink } from "react-router-dom"
import { useEffect, useRef } from "react";




export default function Header() {

  let loc = useLocation()
  let pathname = loc.pathname
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const nav = useNavigate()
  const isLogin = sessionStorage.getItem("isLogin")

  const logout = () => {
    Swal.fire({
      title: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF7F7F",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        nav("/login")
        Swal.fire({
          title: "Logout",
          text: "Logout Successfully",
            icon: "success",
            confirmButtonColor: "#d19c97"
        });
      }
    });
  }

  console.log("isLogin session:", sessionStorage.getItem("isLogin"));


  return (
    <>

      <style>
        {`  
      .nav-link {
  color: #000;
  padding: 8px 12px;
  text-decoration: none;
}

.nav-link.active {
  border-bottom: 2px solid #ff9900;
  color: black !important;
  font-weight: 600;
}

.nav-link:hover {
  color: black !important;
}


      `}
      </style>

      {/* Modal Search Start */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search by keyword
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input
                  type="search"
                  className="form-control p-3"
                  placeholder="keywords"
                  aria-describedby="search-icon-1"
                />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}


      {/* Navbar start */}
      <div className="container-fluid fixed-top ">

        <div className="container topbar  d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-white" />{" "}
                <a href="#" className="text-white">
                  W.R 96 Basti Sheikh
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-white" />
                <a href="#" className="text-white">
                  sahilkhanna2330@gmail.com
                </a>
              </small>
            </div>

            <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </a>
            </div>

          </div>
        </div>

        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <a href="index.html" className="navbar-brand">
              <h1 className="display-6 text-dark">Fashionix</h1>
            </a>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">

                <Link to={"/"} className={`nav-item nav-link ${location.pathname === "/" ? "active" : ""
                  }`}>
                  Home
                </Link>

                <Link to={"/shop"} className={`nav-item nav-link ${location.pathname === "/shop" ? "active" : ""
                  }`}>
                  Shop
                </Link>



                <Link className={`nav-item nav-link ${location.pathname === "/checkout" ? "active" : ""
                  }`} to={"/checkout"}>
                  Cart
                </Link>


                
                <NavLink
                  to="/order"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Orders
                </NavLink>


                <Link to={"/contact"} className={`nav-item nav-link ${location.pathname === "/contact" ? "active" : ""
                  }`}>
                  Contact
                </Link>

              </div>


              <div className="d-flex m-3 me-0">

                <a href="#" className="position-relative me-4 my-auto" style={{ color: "black" }}>
                  {sessionStorage.getItem("name")}
                </a>

                {isLogin && (
                  <Link
                    to="/checkout"
                    className="position-relative me-2 my-auto"
                    style={{ color: "#d19c97" }}
                  >
                    <i className="fa fa-shopping-bag fa-2x" />
                  </Link>
                )}


                {/* Show Login / Signup ONLY when logged out */}
                {!isLogin && (
                  <>
                    <Link to="/login" className={`nav-item nav-link  ${pathname === "/login" ? "active" : ""
                      }`}> Login
                    </Link>

                    <Link to="/register" className={`nav-item nav-link  ${pathname === "/register" ? "active" : ""
                      }`}>
                      Sign Up
                    </Link>
                  </>
                )}

                {/*  <div className="nav-item dropdown">
                  <a
                    href="#" style={{ color: "#d19c97" }}
                    className="nav-link dropdown-toggle my-auto"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fas fa-user fa-2x" />
                  </a>

                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {isLogin ?
                      <a onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }} className=" dropdown-item" href="#">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </a>
                      :
                      <Link to="/login">Login</Link>}


                    <Link to="/changePassword" className="dropdown-item">
                      <i className="fas fa-key me-2"></i>
                      Change Password
                    </Link>

                  </div>

                </div> */}
                {isLogin && (
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      style={{ color: "#d19c97" }}
                      className="nav-link dropdown-toggle my-auto"
                      data-bs-toggle="dropdown"
                    >
                      <i className="fas fa-user fa-2x" />
                    </a>

                    <div className="dropdown-menu m-0 bg-white shadow"
                    style={{ right: "-10px", left: "auto" }}>

                      <a
                        href="#"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Logout
                      </a>
                      
                      <Link to="/changePassword" className="dropdown-item">
                        <i className="fas fa-key me-2"></i>
                        Change Password
                      </Link>



                    </div>
                  </div>
                )}



              </div>
            </div>
          </nav>
        </div>

      </div>
      {/* Navbar End */}





    </>
  )
}