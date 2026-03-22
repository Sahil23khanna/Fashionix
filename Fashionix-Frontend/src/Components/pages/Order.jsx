import PageTitle from "../layouts/PageTitle";
import ApiServices from "../services/ApiServices";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to view your orders",
        confirmButtonColor: "#d19c97",
        confirmButtonText: "Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    ApiServices.myOrderDetails({ addedById: userId })
      .then((res) => {
        if (res.data.success) {
        /*   setOrders(res.data.data);
        } else {
          setOrders([]);
        } */
       const sortedOrders = res.data.data.sort(
          (a, b) =>
            new Date(b.orderId.createdAt) -
            new Date(a.orderId.createdAt)
        );

        setOrders(sortedOrders);
      } else {
        setOrders([]);
      }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load orders", "error");
      })
      .finally(() => setLoading(false));
  }, []);


 /*  useEffect(() => {
    ApiServices.myOrderDetails().then((res) => {
      if (res.data.success) {
        setOrders(res.data.data);
      }
    });
  }, []); */

  const cancelOrder = (orderId) => {
    Swal.fire({
      title: "Cancel Order?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
       confirmButtonColor: "#d19c97",
      cancelButtonColor: "#6c757d"
    }).then((result) => {
      if (result.isConfirmed) {
        ApiServices.cancelOrder({ _id: orderId }).then((res) => {
          if (res.data.success) {
            Swal.fire({
              title: "Cancelled",
              text: res.data.message,
              icon: "success",
              confirmButtonColor: "#d19c97"
            });

            setOrders((prev) =>
              prev.map((o) =>
                o.orderId._id === orderId
                  ? { ...o, orderId: { ...o.orderId, status: "Cancelled" } }
                  : o
              )
            );
          }
        });

      }
    });
  };


  return (
    <>
      <style>
        {`.orders-container {
  max-width: 1100px;
  margin: 30px auto;
}

.order-card {
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  margin-bottom: 25px;
  background: #fff;
  overflow: hidden;
}

/* Header strip */
.order-header {
  display: flex;
  justify-content: space-between;
  background: #f0f2f2;
  padding: 14px 20px;
  font-size: 13px;
}

.order-header div {
  min-width: 180px;
}

.order-header span {
  color: #565959;
  font-weight: 600;
  display: block;
}

.order-id {
  text-align: right;
}

/* Body */
.order-body {
  display: flex;
  gap: 20px;
  padding: 20px;
  border-top: 1px solid #e7e7e7;
}

.order-body img {
  width: 110px;
  height: auto;
  object-fit: contain;
}

.order-info h4 {
  font-size: 16px;
  margin-bottom: 6px;
}

.order-info p {
  margin: 3px 0;
  font-size: 14px;
}

.order-actions {
  margin-left: auto;          
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.btn {
  padding: 6px 14px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
}

.btn.primary {
  background: #ffb524;
  border: 1px solid #f0a800;
  color: #111;
}

.btn.primary:hover {
  background: #f7a700;
}

.btn.outline {
  background: #fff;
  border: 1px solid #d5d9d9;
  color: #111;
}

.btn.outline:hover {
  background: red;
  color: #fff;
  border: 1px solid red;
}


`}
      </style>
    
      <PageTitle>My Orders</PageTitle>

      <div className="orders-container">

        {orders.length === 0 && <p>No orders found</p>}

        {orders.map((item) => (
          <div className="order-card" key={item._id}>

            
            <div className="order-header">
              <div>
                <span>ORDER PLACED</span>
                {new Date(item.orderId.createdAt).toDateString()}
              </div>

              <div>
                <span>TOTAL</span>
                ₹{item.productId.price * item.quantity}
              </div>

              <div className="order-id">
                <span>ORDER #{item.orderId._id}</span>
              </div>
            </div>

            
            <div className="order-body">
              <img src={item.productId.image} alt={item.productId.title} />

              <div className="order-info">
                <h4>{item.productId.title}</h4>
                <p>Qty: {item.quantity}</p>
                <p>Status: <strong>{item.orderId.status}</strong></p>
              </div>

              <div className="order-actions">

                {item.orderId.status === "Placed" && (
                  <button
                    className="btn outline"
                    onClick={() => cancelOrder(item.orderId._id)}
                    style={{ backgroundColor: "rgb(228 105 105)", color: "white"}}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}

      </div>

    </>
  );
}
