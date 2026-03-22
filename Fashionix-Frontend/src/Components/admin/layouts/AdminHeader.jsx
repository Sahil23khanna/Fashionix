import Swal from "sweetalert2"
import { Link,useLocation, useNavigate } from "react-router-dom"



export default function AdminHeader(){

  const location = useLocation();
  const nav = useNavigate()
  const isLogin = sessionStorage.getItem("isLogin") 

  const logout=()=>{
  Swal.fire({
    title: "Do you really want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d19c97",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, Logout"
  }).then((result) => {
    if (result.isConfirmed) {
       sessionStorage.clear()
          nav("/login")
      Swal.fire({
        title: "Logout",
        text: "Logout Successfully",
        icon: "success"
      });
    }
  });
  }

    return(
        <>
         <style>
        {`  
      .nav-link {
  color: #fff;
  padding: 8px 12px;
  text-decoration: none;
}

.nav-link.active {
  border-bottom: 2px solid #ff9900;
  color: #ff9900;
  font-weight: 600;
}

      `}
      </style>
      
        {/* Navbar start */}
        <div className="container-fluid fixed-top">
          <div className="container topbar d-none d-lg-block">
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
                <h1 className="text-dark display-6">Fashionix</h1>
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
                  <Link to={"/admin"}  className={`nav-item nav-link ${
    location.pathname === "/admin" ? "active" : ""
  }`}>
                    Dashboard
                  </Link>
                  <Link to={"/admin/brand/manage"}  className={`nav-item nav-link ${
    location.pathname === "/admin/brand/manage" ? "active" : ""
  }`}>
                    Brands
                  </Link>
                  <Link to={"/admin/category/manage"}  className={`nav-item nav-link ${
    location.pathname === "/admin/category/manage" ? "active" : ""
  }`}>
                    Categories
                  </Link>

                 {/*  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Pages
                    </a>

                    <div className="dropdown-menu m-0 bg-secondary rounded-0">
                      <a href="cart.html" className="dropdown-item">
                        Cart
                      </a>
                      <a href="chackout.html" className="dropdown-item">
                        Chackout
                      </a>
                      <a href="testimonial.html" className="dropdown-item">
                        Testimonial
                      </a>
                      <a href="404.html" className="dropdown-item">
                        404 Page
                      </a>
                    </div>

                  </div> */}

                  <Link to={"/admin/product/manage"} className={`nav-item nav-link ${
    location.pathname === "/admin/product/manage" ? "active" : ""
  }`}>
                    Products
                  </Link>
                  <Link to={"/admin/order/manage"} className={`nav-item nav-link ${
    location.pathname === "/admin/order/manage" ? "active" : ""
  }`}>
                    Orders
                  </Link>
                  <Link to={"/admin/customer/manage"} className={`nav-item nav-link ${
    location.pathname === "/admin/customer/manage" ? "active" : ""
  }`}>
                    Customers
                  </Link>
                </div>
                <div className="d-flex m-3 me-0">

                 {/*  <button
                    className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <i className="fas fa-search text-primary" />
                  </button> */}

                  <a href="#" className="position-relative me-4 my-auto" style={{ color: "black" }}>
                  {sessionStorage.getItem("name")}
                  </a>

                    <div className="nav-item dropdown">
                    <a
                      href="#"
                       style={{ color: "#d19c97" }}
                      className="nav-link dropdown-toggle my-auto"
                      data-bs-toggle="dropdown"
                    >
                       <i className="fas fa-user fa-2x" /> 
                    </a>

                    <div className="dropdown-menu m-0 bg-secondary rounded-0"
                     style={{ right: "-10px", left: "auto" }}>
                       
                    {/*   <a href="cart.html" className="dropdown-item">
                        Logout
                      </a> */}
                       {isLogin?
                     <a onClick={(e)=>{
                      e.preventDefault();
                      logout();
                     }} className=" dropdown-item"  href="#">
                      <i class="fa-solid fa-right-from-bracket"></i>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </a>
                    :
                    <Link to="/login">Login</Link>  }


                      <Link to="/changePassword" className="dropdown-item">
                        <i className="fas fa-key me-2"></i>
                        Change Password
                      </Link>
                      
                    </div>

                  </div>
  
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Navbar End */}
        </>
    )
}