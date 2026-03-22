import PageTitle from "../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../services/ApiServices";
import Swal from "sweetalert2";
import ResponsivePagination from "react-responsive-pagination";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useNavigate } from "react-router-dom";



export default function Shop() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  /*  const [maxPrice, setMaxPrice] = useState(5000);
   const [minPrice, setMinPrice] = useState(0); */
  const [priceRange, setPriceRange] = useState([0, 20000]);


  const navigate = useNavigate();


  const ITEMS_PER_PAGE = 12;

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
          setFilteredProducts(res.data.data);
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
        confirmButtonColor: "#d19c97"
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

  useEffect(() => {
    let temp = [...products];

    if (selectedCategory) {
      temp = temp.filter(p => p.categoryId?._id === selectedCategory);
    }

    if (selectedBrand) {
      temp = temp.filter(p => p.brandId?._id === selectedBrand);
    }

    if (selectedGender) {
      temp = temp.filter(p => p.gender === selectedGender);
    }

    if (selectedSize) {
      temp = temp.filter(p => p.size === selectedSize);
    }

    temp = temp.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [products, selectedCategory, selectedBrand, selectedGender, selectedSize, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  return (

    <>
      <PageTitle>Shop</PageTitle>

      {/* Fruits Shop Start*/}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Wear the Trend</h1>
          <div className="row g-4">
            <div className="col-lg-12 ">
              <div className="row g-4">
                <div className="col-xl-3">
                  <div className="input-group w-100 mx-auto d-flex">
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
                <div className="col-6" />
                <div className="col-xl-3 ">
                  {/*    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="fruits">Default Sorting:</label>
                    <select
                      id="fruits"
                      name="fruitlist"
                      className="border-0 form-select-sm bg-light me-3"
                      form="fruitform"
                    >
                      <option value="volvo">Nothing</option>
                      <option value="saab">Popularity</option>
                      <option value="opel">Organic</option>
                      <option value="audi">Fantastic</option>
                    </select>
                  </div> */}
                </div>
              </div>
              <div className="row g-4 mt-1">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        {/* <h4>Categories</h4> */}
                        {/*  <ul className="list-unstyled fruite-categorie">
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Apples
                              </a>
                              <span>(3)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Oranges
                              </a>
                              <span>(5)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Strawbery
                              </a>
                              <span>(2)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Banana
                              </a>
                              <span>(8)</span>
                            </div>
                          </li>
                          <li>
                            <div className="d-flex justify-content-between fruite-name">
                              <a href="#">
                                <i className="fas fa-apple-alt me-2" />
                                Pumpkin
                              </a>
                              <span>(5)</span>
                            </div>
                          </li>
                        </ul> */}
                        <h4>Categories</h4>
                        <ul className="list-unstyled fruite-categorie">
                          <li>
                            <button className="btn w-100 text-start" onClick={() => setSelectedCategory("")}>
                              All Categories
                            </button>
                          </li>
                          {Array.from(
                            new Map(products.map(p => [p.categoryId?._id, p.categoryId])).values()
                          ).map(cat => (
                            <li key={cat?._id}>
                              <button
                                className={`btn w-100 text-start ${selectedCategory === cat._id ? "text-dark fw-bold" : ""
                                  }`}
                                onClick={() => setSelectedCategory(cat._id)}
                              >
                                {cat?.categoryName}
                              </button>
                            </li>
                          ))}

                        </ul>

                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        {/*  <h4 className="mb-2">Price</h4>
                        <input
                          type="range"
                          className="form-range w-100"
                          id="rangeInput"
                          name="rangeInput"
                          min={0}
                          max={500}
                          defaultValue={0}
                          onInput={(e) => {
                            document.getElementById("amount").value = e.target.value;
                          }}

                        />
                        <output
                          id="amount"
                          name="amount"
                          min-value={0}
                          max-value={500}
                          htmlFor="rangeInput"
                        >
                          0
                        </output> */}
                        {/*     <h4 className="mb-2">Price</h4>

                        <label className="form-label">Min: ₹{minPrice}</label>
                        <input
                          type="range"
                          className="form-range"
                          min={0}
                          max={maxPrice}
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                        />

                        <label className="form-label mt-2">Max: ₹{maxPrice}</label>
                        <input
                          type="range"
                          className="form-range"
                          min={minPrice}
                          max={5000}
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                        /> */}

                        <h4>Price</h4>

                        <Slider
                          range
                          min={0}
                          max={20000}
                          value={priceRange}
                          onChange={setPriceRange}
                        />

                        <p className="mt-2">
                          ₹{priceRange[0]} – ₹{priceRange[1]}
                        </p>

                      </div>
                    </div>

                    <div className="col-lg-12">
                      {/*  <div className="mb-3">
                        <h4>Additional</h4>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-1"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-1"> Organic</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-2"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-2"> Fresh</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-3"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-3"> Sales</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-4"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-4"> Discount</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="radio"
                            className="me-2"
                            id="Categories-5"
                            name="Categories-1"
                            defaultValue="Beverages"
                          />
                          <label htmlFor="Categories-5"> Expired</label>
                        </div>
                      </div> */}
                      <h4 className="mb-3">SuitableFor</h4>
                      <div>
                        {["Men", "Women", "Unisex"].map(g => (
                          <div key={g} className="mb-2">
                            <input
                              type="radio"
                              name="gender"
                              className="gender-radio"
                              checked={selectedGender === g}
                              onChange={() => setSelectedGender(g)}
                            />
                            <label className="ms-2">{g}</label>
                          </div>
                        ))}
                        <button className="btn btn-sm mt-2" onClick={() => setSelectedGender("")}>
                          Clear
                        </button>
                      </div>

                    </div>

                    <div className="col-lg-12">
                      <h4 className="mb-3"> Select Size</h4>
                      {["XS", "S", "M", "L", "XL"].map((s) => (
                        <button
                          key={s}
                          className={`btn btn-sm rounded-pill me-2 ${selectedSize === s ? "btn-dark" : "btn-outline-dark"
                            }`}
                          onClick={() => setSelectedSize(s)}
                        >
                          {s}
                        </button>
                      ))}

                    </div>

                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => {
                        setSelectedCategory("");
                        setSelectedBrand("");
                        setSelectedGender("");
                        setSelectedSize("");
                        setCurrentPage(1);
                        setPriceRange([0, 20000]);
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">

                    {loading ? (
                      <p className="text-center">Loading products...</p>
                    ) : products.length === 0 ? (
                      <p className="text-center">No products found</p>
                    ) : (
                      paginatedProducts.map((product) => (
                        <div className="col-md-6 col-lg-6 col-xl-4 " key={product._id}>
                          <div className="rounded position-relative fruite-item h-100 d-flex flex-column" style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/product/${product._id}`)}>

                            <div className="fruite-img">
                              <img
                                src={product.image}
                                className="img-fluid w-100 rounded-top"
                                alt={product.title}
                                style={{ height: "200px", objectFit: "contain" }}
                              />
                            </div>

                            <div
                              className="text-white  px-3 py-1 rounded position-absolute"
                              style={{ top: 10, left: 10, backgroundColor: "#d19c97" }}>
                              {product.categoryId?.categoryName}
                            </div>

                            <div className="p-4 border-top-0 rounded-bottom d-flex flex-column flex-grow-1"
                              style={{ border: "1px solid #d19c97" }}>
                              <h4>{product.title}</h4>

                              <p className="small text-muted">
                                Brand: {product.brandId?.brandName}
                              </p>

                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">
                                  ₹{product.price}
                                </p>

                                <button className="btn  rounded-pill px-3 borderbutton"
                                  /* onClick={() => handleCart(product._id, product.title)} */
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCart(product._id);
                                  }}>
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
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <ResponsivePagination
                    className="custom-pagination"
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </div>



    </>


  )

}