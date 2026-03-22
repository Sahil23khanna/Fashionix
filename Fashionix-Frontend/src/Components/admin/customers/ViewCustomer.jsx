import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function ViewCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchSingleCustomer();
  }, [id]);

  const fetchSingleCustomer = () => {
    const formData = { userId: id };

    ApiServices.singleCustomer(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setCustomer(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong.");
      })
      .finally(() => {
        setTimeout(() => setLoad(false), 500);
      });
  };

  return (
    <>

      <style>

 {`
.customer-card {
  max-width: 450px;
  width: 100%;
  background: linear-gradient(145deg, #ffffff, #f9f4f3);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;
  border: 1px solid #f1e4e2;
}

.customer-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 55px rgba(0, 0, 0, 0.12);
}


.avatar-circle {
  height: 90px;
  width: 90px;
  margin: 0 auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #d19c97, #c0847d);
  color: white;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(209, 156, 151, 0.35);
}

.divider {
  height: 1px;
  background: #e8d6d3;
}

.info-box p {
  font-size: 15px;
  margin-bottom: 14px;
}

.info-box strong {
  color: #b07b76;
}
  `}
      </style>


      <PageTitle>View Customer</PageTitle>
     
       <section
    className="d-flex justify-content-center align-items-center"
    style={{  marginTop: "6vh", marginBottom: "6vh" }}
  >
    {load && (
      <HashLoader
        loading={load}
        color="#d19c97"
        cssOverride={{ display: "block", margin: "0 auto" }}
      />
    )}

    {!load && (
      <div className="container d-flex justify-content-center">
        <div className="customer-card p-4 text-center">

         
          <div className="avatar-circle mb-3">
            {customer?.userId?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

         
          <h4 className="fw-bold mb-1">
            {customer?.userId?.name}
          </h4>
          <p className="text-muted small mb-3">
            {customer?.userId?.email}
          </p>

          <div className="divider my-3"></div>

         
          <div className="info-box text-start " >
            <Info label="Contact " value={customer?.phone}  />
            <Info label="Address " value={customer?.address} />
          </div>

        </div>
      </div>
    )}
  </section>
    </>

  );
}

// Reusable Info Component
const Info = ({ label, value }) => (
  <p className="mb-3 fs-6">
    <strong className="text-dark">{label}:</strong>{" "}
    <span className="text-dark">{value || "N/A"}</span>
  </p>
);
