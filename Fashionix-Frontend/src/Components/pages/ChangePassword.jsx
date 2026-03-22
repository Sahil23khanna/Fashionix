import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import ApiServices from "../services/ApiServices";
import PageTitle from "../layouts/PageTitle"


export default function ChangePassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    const formData = {
      userId: id,
      oldPassword,
      newPassword,
      confirmPassword,
    };

    ApiServices.changePassword(formData)
      .then((res) => {
        if (res.data.success) {
          sessionStorage.clear();
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong.");
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
      });
  };

  return (
    

      <section className="section-padding" id="change-password" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <PageTitle>Change Password</PageTitle>
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
          {/* Back Button */}
          <button
            type="button"
            className="btn btn-outline-secondary position-absolute top-0 start-0 m-4"
            onClick={() => navigate(-1)}
          >
            &larr; Back
          </button>

          {/* Loader Overlay */}
          {loading && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
              style={{
                backdropFilter: "blur(4px)",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                zIndex: 10,
              }}
            >
              <FadeLoader color="#f98603" />
            </div>
          )}

          {/* Card */}
          <div className={`card shadow-lg border-0 w-100 ${loading ? "pointer-events-none" : ""}`} style={{ maxWidth: "500px", borderRadius: "16px" }}>
            <div className="card-body p-4">
              <h3 className="mb-4 text-center text-dark">Change Your Password</h3>
              <form onSubmit={handleForm}>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn  w-100 btn-lg text-white"
                  style={{ background: "#d19c97" }}>
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

     
   
  );
}
