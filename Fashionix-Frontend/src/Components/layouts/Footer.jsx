import { Link } from "react-router-dom"

export default function Footer() {

  return (<>

    <>

      {/* Footer Start */}
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid #e6c1be" }}>
            <div className="row g-4">
              <div className="col-lg-3">
                <a href="#">
                  <h1 className=" mb-0" style={{ color: "#e6c1be" }}>Fashionix</h1>
                  <p className=" mb-0" style={{ color: "white" }} >Trending Fashion</p>
                </a>
              </div>
              <div className="col-lg-6">
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3" >
                  <a
                    className="btn  btnicons me-2 btn-md-square rounded-circle">
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    className="btn btnicons me-2 btn-md-square rounded-circle"

                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btnicons me-2 btn-md-square rounded-circle"

                  >
                    <i className="fab fa-youtube" />
                  </a>
                  <a
                    className="btn btnicons btn-md-square rounded-circle"

                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Why People Like us!</h4>
                <p className="mb-4">
                  We focus on quality service, reliable products, and a smooth shopping experience for every customer.
                </p>
                <Link
                  to={"/contact"}
                  className="btn readmore py-2 px-4 rounded-pill "
                  style={{ color: "#e6c1be" }}>
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Shop Info</h4>

                <Link className="btn-link" to={"/contact"}>
                  Contact Us
                </Link>
                <Link className="btn-link">
                  Privacy Policy
                </Link>
                <Link className="btn-link">
                  Terms &amp; Condition
                </Link>
                <Link className="btn-link">
                  Return Policy
                </Link>
                <Link className="btn-link">
                  FAQs &amp; Help
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Account</h4>
                <a className="btn-link" href="">
                  My Account
                </a>
                <a className="btn-link" href="">
                  Shop details
                </a>
                <Link className="btn-link" to={"/checkout"}>
                  Shopping Cart
                </Link>

                <Link className="btn-link" to={"/order"}>
                  Order History
                </Link>

              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Contact</h4>
                <p>Address: W.R 96 Basti Sheikh</p>
                <p>Email: sahilkhanna2330@gmail.com</p>
                <p>Phone: +91 9517806970</p>
                <p>Payment Accepted</p>
                <img src="/assets/img/payment.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}


      {/* Copyright Start */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light">
                <a href="#">
                  <i className="fas fa-copyright text-light me-2" />
                  <span style={{ color: "#e6c1be" }}> Fashionix </span>
                </a>
                , All right reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}


      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-primary back-to-top-design border-3 border-primary rounded-circle back-to-top"
      >
        <i className="fa fa-arrow-up" />
      </a>

    </>

  </>
  )
}