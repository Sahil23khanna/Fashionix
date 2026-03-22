import PageTitle from "../layouts/PageTitle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiServices from "../services/ApiServices";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  const fetchSingleProduct = () => {
    setLoad(true);
    ApiServices.singleProduct({ _id: id })
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoad(false));
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

  return (
    <>
      <PageTitle>Product Detail</PageTitle>

      <div className="container-fluid py-5">
        {load && (
          <HashLoader
            color="#d19c97"
            cssOverride={{ display: "block", margin: "0 auto" }}
          />
        )}

        {!load && product && (
          <div className="container py-5">
            <div className="row g-4 ">

              {/* Left Content */}
              <div className="col-lg-8 col-xl-9">
                <div className="row g-4">

                  {/* Image */}
                  <div className="col-lg-6">
                    <div className="border rounded">
                      <img
                        src={product.image}
                        className="img-fluid rounded w-100"
                        alt={product.title}
                      />
                    </div>
                  </div>

                 
                  <div className="col-lg-6">
                    <h4 className="fw-bold mb-3">{product.title}</h4>
                    <h5 className="fw-bold mb-3">₹ {product.price}</h5>

                    <p><strong>Size:</strong> {product.size}</p>
                    <p><strong>SuitableFor:</strong> {product.gender}</p>
                    <p><strong>Brand:</strong> {product?.brandId?.brandName}</p>
                    <p className="mb-3">
                      Category: {product?.categoryId?.categoryName}
                    </p>


                    <button

                      
                      className="btn rounded-pill px-4 py-2 mb-4 borderbutton"
                      onClick={() => handleCart(product._id)}
                    >
                      <i className="fa fa-shopping-bag me-2 text-dark" />
                      Add to cart
                    </button>
                  </div>

                  {/* TABS */}
                  <div className="col-lg-12">
                    <nav>
                      <div className="nav nav-tabs mb-3">
                        <button
                          className="nav-link active border-white border-bottom-0"
                          data-bs-toggle="tab"
                          data-bs-target="#desc"
                        >
                          Description
                        </button>
                      </div>
                    </nav>

                    <div className="tab-content mb-5">
                      <div className="tab-pane active" id="desc">
                        <p>{product.description}</p>

                        <div className="row g-4 mt-4">
                          <div className="col-6">
                            <div className="row bg-light py-2 text-center">
                              <div className="col-6">Type</div>
                              <div className="col-6">{product.type}</div>
                            </div>
                            <div className="row py-2 text-center">
                              {/*  <div className="col-6">Quantity</div>
                              <div className="col-6">{product.quantity}</div> */}
                            </div>
                            <div className="row bg-light py-2 text-center">
                              <div className="col-6">Status</div>
                              <div className="col-6">
                                {product.status ? "Available" : "Unavailable"}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>

              
              <div className="col-lg-4 col-xl-3">
                <div className="p-4 bg-light rounded">
                  <h4 className="mb-4">Why Fashionix?</h4>
                  <p>Premium fabrics</p>
                  <p>Trendy designs</p>
                  <p>Fast delivery</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}
