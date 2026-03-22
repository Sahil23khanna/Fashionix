import { useState } from "react";
import { toast } from "react-toastify";
import ApiServices from "../../services/ApiServices";
import { HashLoader } from "react-spinners";
import PageTitle from "../../layouts/PageTitle";

export default function AddBrand() {
 
  const [brandName, setBrandName] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [load, setLoad] = useState(false);

  const changeImg = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoad(true);

    let formData = new FormData();
   
    formData.append("brandName", brandName);
    formData.append("image", image);

    ApiServices.addBrand(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
         
          setBrandName("");
          setImage({});
          setImageName("");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
      });
  };

  return (
    <>
      <main className="main">
        <PageTitle>Add Brand</PageTitle>

        <section
          id="contact"
          className="section d-flex justify-content-center align-items-center"
          style={{  marginTop:"6vh" }}
        >
          <HashLoader
            color="#d19c97"
            cssOverride={{ display: "block", margin: "0 auto" }}
            loading={load}
          />

          {!load && (
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                  <div
                    className="card shadow-lg rounded-4 p-4"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <h3 className="card-title text-center text-dark mb-4 fw-semibold">
                      Add New Brand
                    </h3>

                    <form method="post" onSubmit={handleForm} encType="multipart/form-data">
                      <div className="mb-4">
                        <label
                          htmlFor="topicInput"
                          className="form-label fw-medium text-dark"
                        >
                          Brand Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="BrandInput"
                          placeholder="Enter Brand Name"
                          required
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="imageInput"
                          className="form-label fw-medium text-dark"
                        >
                          Brand Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="imageInput"
                          required
                          value={imageName}
                          onChange={changeImg}
                        />
                      </div>

                      <button type="submit" className="btn  w-100 py-2 fw-semibold" style={{backgroundColor:"#d19c97", color:"white"}}>
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
