import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../layouts/PageTitle";
import ApiServices from "../services/ApiServices";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners"


export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Fetches Cart Items 
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to view your cart",
        confirmButtonColor: "#d19c97",
        confirmButtonText: "Login"
      }).then(() => navigate("/login"));
      return;
    }

    ApiServices.customerCartAll({ addedById: userId })
      .then((res) => {
        if (res.data.success) {
          setCart(res.data.data);
        } else {
          setCart([]);
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load cart", "error");
      })
      .finally(() => setLoading(false));
  }, []);


  // Updates Cart Items Quantity
  const updateQuantity = (cartId, newQty) => {
    if (newQty < 1) return;

    ApiServices.updateCart({
      _id: cartId,
      quantity: newQty,
    })
      .then((res) => {
        if (res.data.success) {
          // Update UI instantly
          setCart((prev) =>
            prev.map((item) =>
              item._id === cartId
                ? { ...item, quantity: newQty }
                : item
            )
          );
        } else {
          Swal.fire("Error", res.data.message, "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update cart", "error");
      });
  };


  // Subtotal calculation
  /*   const subtotal = cart.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0); */
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) =>
        total + item.productId.price * item.quantity,
      0
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemText = totalItems === 1 ? "item" : "items";

  // Delete Cart Item
  const handleDelete = (cartId) => {
    Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
        confirmButtonColor: "#d19c97",
      cancelButtonColor: "#6c757d"
    }).then((result) => {
      if (result.isConfirmed) {
        ApiServices.deleteCartItem({ _id: cartId })
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                icon: "success",
                title: "Removed",
                text: res.data.message,
                timer: 1000,
                showConfirmButton: false,
              });

              // Remove from UI
              setCart((prev) =>
                prev.filter((item) => item._id !== cartId)
              );
            } else {
              Swal.fire("Error", res.data.message, "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to remove item", "error");
          });
      }
    });
  };


  const placeOrder = async () => {
    if (!shippingAddress.trim()) {
      Swal.fire({
        title: "Warning",
        text: "Shipping address is required",
        icon: "warning",
        confirmButtonColor: "#d19c97"
      });
      return;
    }

    setLoading(true); 

    try {
      const res = await ApiServices.orderAdd({ shippingAddress });

      if (res.data.success) {
        await Swal.fire({
          title: "Success",
          text: "Order placed successfully",
          icon: "success",
          confirmButtonColor: "#d19c97"
        });
        navigate("/order");
      } else {
        Swal.fire("Error", res.data.message || "Order failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <style>
        {`
      .cart-item img {
  width: 120px;
  height: auto;
  object-fit: contain;
}

.cart-title {
  font-size: 15px;
  font-weight: 500;
}

.qty-box {
  display: flex;
  align-items: center;
  border: 2px solid #ffd814;
  border-radius: 20px;
  overflow: hidden;
}

.qty-box button {
  background: #f7f7f7;
  border: none;
  padding: 4px 10px;
  font-weight: bold;
}

.qty-box span {
  padding: 0 12px;
}

.action-link {
  font-size: 13px;
  color: #007185;
  cursor: pointer;
}

.action-link:hover {
  text-decoration: underline;
}

.cart-price h6 {
  font-weight: 600;
}

.subtotal-box {
  background: #fff;
  border-radius: 8px;
}
`}
      </style>
      <PageTitle>Cart</PageTitle>



      <div className="container my-4">
        {loading ?
          <HashLoader color="#d19c97" cssOverride={{ display: "block", margin: "0 auto" }} loading={loading} />
          :
          <>  <h1 className="mb-5">Shopping Cart</h1>

            <div className="row">
              {/* LEFT SIDE – CART ITEMS */}
              <div className="col-md-9">
                {cart.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div className="cart-item d-flex border-bottom py-4" key={item._id}>


                      {/* Product Image */}
                      <div className="cart-image me-4">
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.title}
                          className="img-fluid"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="cart-details flex-grow-1">
                        <h6 className="cart-title">
                          {item.productId?.title}
                        </h6>

                        <p className="text-success mb-1">In stock</p>

                        <p className="small text-muted mb-2">
                          Size: {item.productId?.size || "Standard"}
                        </p>

                        <p className="small text-muted mb-2">
                          Brand: {item.productId?.brandId?.brandName || "Generic"}
                        </p>

                        {/* Quantity + Actions */}
                        <div className="d-flex align-items-center gap-3">

                          {/* Quantity Box */}
                          <div className="qty-box">
                            <button onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity - 1
                              )
                            }>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity + 1
                              )
                            }> +  </button>
                          </div>

                          <span className="action-link" onClick={() => handleDelete(item._id)}>
                            Delete
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="cart-price text-end">
                        <h6>₹{item.productId?.price}</h6>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* RIGHT SIDE – SUBTOTAL */}
              {/* <div className="col-md-3">
      <div className="subtotal-box p-3 shadow-sm">
        <h6>
          Subtotal ({cart.length} items):
          <span className="fw-bold">
            ₹{calculateSubtotal()}
          </span>
        </h6> */}
              <div className="col-md-3">
                <div className="subtotal-box p-3 shadow-sm">
                  <h6>
                    Subtotal ({totalItems} {itemText})
                    {totalItems > 0 && (
                      <span className="fw-bold ms-1">
                        : ₹{calculateSubtotal()}
                      </span>
                    )}
                  </h6>

                  {/* <button className="btn btn-warning w-100 mt-3" disabled={totalItems === 0}>
          Proceed to Buy
        </button> */}
                  <textarea
                    className="form-control mb-3"
                    rows="6"
                    style={{ resize: "none" }}
                    placeholder="Enter shipping address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />
                  <button
                    className="btn  w-100 py-2"
                    style={{ backgroundColor: "#d19c97", color: "#fff" }}
                    onClick={placeOrder}
                    disabled={cart.length === 0}
                  >
                    Place Order
                  </button>

                </div>
              </div>
            </div>
          </>

        }
      </div>


    </>
  );
}
