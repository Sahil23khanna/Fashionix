import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiServices from "../services/ApiServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);

    ApiServices.allProduct({
      status: true,   // only active products
    })
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };



  const handleCart = (id) => {
    const userId = sessionStorage.getItem("userId");

    // LOGIN CHECK
    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add items to cart",
        confirmButtonColor: "#d19c97",
      });
      return;
    }

    Swal.fire({
      title: `Add this product to cart?`,
      text: "You can review it later in Cart",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d19c97",
      cancelButtonColor: "#6c757d"
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = {
          addedById: userId,
          productId: id,
          quantity: 1
        };

        ApiServices.addToCart(formData)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                icon: "success",
                title: "Added to Cart",
                text: res.data.message,
                timer: 1200,
                showConfirmButton: false,
              });
            } else {
              Swal.fire("Error", res.data.message, "error");
            }
          })
          .catch((err) => {
            Swal.fire("Error", err?.message || "Something went wrong", "error");
          });
      }
    });
  };


  return (
    <>

      <>

        {/* Hero Start */}
        <div className="container-fluid py-5 mb-5 hero-header">
          <div className="container py-5">
            <div className="row g-5 align-items-center">
              <div className="col-md-12 col-lg-7">
                <h4 className="mb-3 fs-5" style={{ color: "black" }}>Premium Quality Products</h4>
                <h1 className="mb-5 display-3 text-dark" /* style={{color:"black"}} */>
                  {/*  Organic Veggies &amp; Fruits Foods */}
                  Everything You Need, One Click Away
                </h1>
                {/*    <div className="position-relative mx-auto">
            <input
              className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
              type="number"
              placeholder="Search"
            />
            <button
              type="submit"
              className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
              style={{ top: 0, right: "25%" }}
            >
              Submit Now
            </button>
          </div> */}
              </div>
              <div className="col-md-12 col-lg-5">
                <div
                  id="carouselId"
                  className="carousel slide position-relative"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active rounded">
                      <img
                        src="/assets/img/hero-img-4.jpg"
                        className="img-fluid w-100 h-100 rounded bg-secondary"
                        alt="First slide"

                      />

                    </div>
                    <div className="carousel-item rounded">
                      <img
                        src="/assets/img/hero-img-5.avif"
                        className="img-fluid w-100 h-100 rounded"
                        alt="Second slide"
                      />

                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselId"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselId"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}


        {/* Featurs Section Start */}
        <div className="container-fluid featurs py-5">
          <div className="container py-5">
            <div className="row g-4">
              <div className="col-md-6 col-lg-3" >
                <div className="featurs-item text-center rounded bg-light p-4" >
                  <div className="featurs-icon btn-square rounded-circle  mb-5 mx-auto" style={{ backgroundColor: "#d19c97" }}>
                    <i className="fas fa-car-side fa-3x text-white" />
                  </div>
                  <div className="featurs-content text-center" >
                    <h5>Free Shipping</h5>
                    <p className="mb-0">Free on purchase over 500</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                  <div className="featurs-icon btn-square rounded-circle  mb-5 mx-auto" style={{ backgroundColor: "#d19c97" }}>
                    <i className="fas fa-user-shield fa-3x text-white" style={{ backgroundColor: "#d19c97" }} />
                  </div>
                  <div className="featurs-content text-center">
                    <h5>Security Payment</h5>
                    <p className="mb-0">100% security payment</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                  <div className="featurs-icon btn-square rounded-circle  mb-5 mx-auto" style={{ backgroundColor: "#d19c97" }}>
                    <i className="fas fa-exchange-alt fa-3x text-white" />
                  </div>
                  <div className="featurs-content text-center">
                    <h5>10 Day Return</h5>
                    <p className="mb-0">10 day money guarantee</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="featurs-item text-center rounded bg-light p-4">
                  <div className="featurs-icon btn-square rounded-circle  mb-5 mx-auto" style={{ backgroundColor: "#d19c97" }}>
                    <i className="fa fa-phone-alt fa-3x text-white" />
                  </div>
                  <div className="featurs-content text-center">
                    <h5>24/7 Support</h5>
                    <p className="mb-0">Support every time fast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Featurs Section End */}



        {/*   <div className="container-fluid fruite py-5">
    <div className="container py-5">
      <div className="tab-class text-center">
        <div className="row g-4">
          <div className="col-lg-4 text-start">
            <h1>Our Special Products</h1>
          </div>
          <div className="col-lg-8 text-end">
            <ul className="nav nav-pills d-inline-flex text-center mb-5">
              <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                >
                  <span className="text-dark" style={{ width: 100 }}>
                    All Products
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex py-2 m-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-2"
                >
                  <span className="text-dark" style={{ width: 100 }}>
                    Shirts
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-3"
                >
                  <span className="text-dark" style={{ width: 100 }}>
                    T-shirts
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-4"
                >
                  <span className="text-dark" style={{ width: 100 }}>
                    Jeans
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-5"
                >
                  <span className="text-dark" style={{ width: 100 }}>
                    Footwear
                  </span>
                </a>
              </li>
               <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-5"
                >
                  <span className="text-dark" style={{ width: 100 }}>
                    Accessories
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-5"
                >
                  <span className="text-dark" style={{ width: 100 }}>
                    Hoodies
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

         <div className="col-lg-12">
                  <div className="row g-4 justify-content-center">

                    {loading ? (
                      <p className="text-center">Loading products...</p>
                    ) : products.length === 0 ? (
                      <p className="text-center">No products found</p>
                    ) : (
                      products.map((product) => (
                        <div className=" col-12 col-md-6 col-lg-4 col-xl-3" key={product._id}>
                          <div className="rounded position-relative fruite-item ">

                            <div className="fruite-img">
                              <img
                                src={product.image}
                                className="img-fluid w-100 rounded-top"
                                alt={product.title}
                                style={{ height: "200px", objectFit: "contain" }}
                              />
                            </div>

                            <div
                              className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                              style={{ top: 10, left: 10 }}
                            >
                              {product.categoryId?.categoryName}
                            </div>

                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                              <h4>{product.title}</h4>

                              <p className="small text-muted">
                                Brand: {product.brandId?.brandName}
                              </p>

                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">
                                  ₹{product.price}
                                </p>

                                <button className="btn border border-secondary rounded-pill px-3 text-dark" >
                                  <i className="fa fa-shopping-bag me-2 text-dark" />
                                  Add to cart
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))
                    )}
                    
                  </div>
                </div>

      </div>
    </div>
  </div> */}



        <div className="container-fluid fruite py-4">
          <div className="container py-5">
            <div className="tab-class">

              {/* Heading */}
              <div className="row mb-5">
                <div className="col text-center">
                  <h1 className="mb-3">Our Special Products</h1>
                  <div
                    className="mx-auto bg-secondary"
                    style={{ width: "80px", height: "3px", borderRadius: "2px" }}
                  ></div>
                </div>
              </div>

              {/* Products */}
              <div className="row g-5 justify-content-center">

                {loading ? (
                  <p className="text-center">Loading products...</p>
                ) : products.length === 0 ? (
                  <p className="text-center">No products found</p>
                ) : (
                  products.slice(0, 16).map((product) => (
                    <div
                      className="col-12 col-md-6 col-lg-4 col-xl-3"
                      key={product._id}
                    >
                      {/* Card */}
                      <div className="rounded position-relative fruite-item h-100 d-flex flex-column" style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/product/${product._id}`)}>

                        {/* Image */}
                        <div className="fruite-img">
                          <img
                            src={product.image}
                            className="img-fluid w-100 rounded-top"
                            alt={product.title}
                            style={{ height: "200px", objectFit: "contain" }}
                          />
                        </div>

                        {/* Category Badge */}
                        <div
                          className="text-white px-3 py-1 rounded position-absolute"
                          style={{ top: 10, left: 10, backgroundColor: "#d19c97" }}
                        >
                          {product.categoryId?.categoryName}
                        </div>

                        {/* Card Body */}
                        <div className="p-4 border-top-0 rounded-bottom d-flex flex-column flex-grow-1"
                          style={{ border: "1px solid #d19c97" }}>

                          <h5 className="mb-2">{product.title}</h5>

                          <p className="small text-muted mb-3">
                            Brand: {product.brandId?.brandName}
                          </p>

                          {/* Push price + button to bottom */}
                          <div className="mt-auto d-flex justify-content-between align-items-center">
                            <p className="text-dark fs-5 fw-bold mb-0">
                              ₹{product.price}

                            </p>

                            <button className="btn  rounded-pill px-3 text-dark borderbutton"
                              style={{ border: "1px solid #d19c97" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCart(product._id);
                              }}>
                              <i className="fa fa-shopping-bag me-2 text-dark" />
                              Add to Cart
                            </button>
                          </div>

                        </div>

                      </div>
                    </div>
                  ))
                )}

              </div>

              {products.length > 16 && (
                <div className="row mt-5">
                  <div className="col text-center">
                    <Link className="btn btn-dark px-5 py-2 rounded-pill" to={"/shop"}>
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>








        {/* Banner Section Start*/}
        {/*   <div className="container-fluid banner bg-secondary my-5">
    <div className="container py-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <div className="py-4">
            <h1 className="display-3 text-white">Fresh Exotic Fruits</h1>
            <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
            <p className="mb-4 text-dark">
              The generated Lorem Ipsum is therefore always free from repetition
              injected humour, or non-characteristic words etc.
            </p>
            <a
              href="#"
              className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5"
            >
              BUY
            </a>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="position-relative">
            <img
              src="/assets/img/baner-1.png"
              className="img-fluid w-100 rounded"
              alt=""
            />
            <div
              className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
              style={{ width: 140, height: 140, top: 0, left: 0 }}
            >
              <h1 style={{ fontSize: 100 }}>1</h1>
              <div className="d-flex flex-column">
                <span className="h2 mb-0">50$</span>
                <span className="h4 text-muted mb-0">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
        {/* Banner Section End */}


        {/* Fact Start */}
        {/*  <div className="container-fluid py-5">
    <div className="container">
      <div className="bg-light p-5 rounded">
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="counter bg-white rounded p-5">
              <i className="fa fa-users text-secondary" />
              <h4>satisfied customers</h4>
              <h1>1963</h1>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="counter bg-white rounded p-5">
              <i className="fa fa-users text-secondary" />
              <h4>quality of service</h4>
              <h1>99%</h1>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="counter bg-white rounded p-5">
              <i className="fa fa-users text-secondary" />
              <h4>quality certificates</h4>
              <h1>33</h1>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="counter bg-white rounded p-5">
              <i className="fa fa-users text-secondary" />
              <h4>Available Products</h4>
              <h1>789</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
        {/* Fact Start */}



      </>


    </>
  )
}