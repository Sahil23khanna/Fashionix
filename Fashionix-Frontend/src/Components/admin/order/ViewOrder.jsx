import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function ViewOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchSingleOrder();
  }, [id]);

  const fetchSingleOrder = () => {
    const formData = { _id: id };

    ApiServices.singleOrder(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setOrder(res.data.order);
          setItems(res.data.items);
        }
        else {
          toast.error(res.data.message);
        }
      })

      .catch(() => {
        toast.error("Something went wrong.");
      })

      .finally(() => {
        setTimeout(() => setLoad(false), 500);
      });
  };

  return (
    <>
      <PageTitle>View Order</PageTitle>

      <section style={{ marginTop: "8vh" }}>
        {load && (
          <HashLoader
            color="#d19c97"
            cssOverride={{ display: "block", margin: "0 auto" }}
          />
        )}

        {!load && order && (
          <div className="container d-flex justify-content-center">
            <div
              className="card shadow border-0"
              style={{
                maxWidth: "650px",
                width: "100%",
                borderRadius: "14px",
              }}
            >
              <div className="card-body p-4">

                {/* Header */}
                <div className="text-center mb-3">
                  <h5 className="fw-bold mb-1">Order Details</h5>
                  <span className="badge bg-primary">{order.status}</span>
                </div>

                <hr />

                {/* Order Info */}
                <div className="row mb-3">
                  <div className="col-6">
                    <Info label="Order ID" value={order?._id} />
                  </div>
                  <div className="col-6 text-end">
                    <Info
                      label="Order Date"
                      value={new Date(order?.createdAt).toLocaleDateString()}
                    />
                  </div>
                </div>

                <Info label="Shipping Address" value={order?.shippingAddress} />

                <hr />

                {/* Items */}
                <h6 className="fw-bold mb-3">Order Items</h6>

                {items.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-3 p-2"
                    style={{
                      border: "1px solid #eee",
                      borderRadius: "10px",
                    }}
                  >
                    {/* Product Image */}
                    <img
                      src={item?.productId?.image}
                      alt={item?.productId?.title}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />

                    {/* Product Info */}
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1">{item?.productId?.title}</h6>
                      <small className="text-muted">
                        Quantity: {item?.quantity}
                      </small>
                    </div>

                    {/* Price */}
                    <div className="fw-bold text-success">
                      ₹{item?.productId?.price}
                    </div>
                  </div>
                ))}

                <hr />

                {/* Total */}
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold mb-0">Total Amount</h6>
                  <h5 className="fw-bold text-success mb-0">
                    ₹{order?.totalPrice}
                  </h5>
                </div>

              </div>
            </div>
          </div>
        )}
      </section>

    </>
  );
}

const Info = ({ label, value }) => (
  <p className="mb-2">
    <strong>{label}:</strong>{" "}
    <span className="text-muted">{value || "N/A"}</span>
  </p>
);
