import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle"
import ApiServices from "../../services/ApiServices";
import { HashLoader } from "react-spinners";


export default function EditProduct() {
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState("")
    const [previousImage, setPreviousImage] = useState("")
    const [size, setSize] = useState("")
    const [gender, setGender] = useState("")
    const [type, setType] = useState("")
    const [price, setPrice] = useState()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetchSingleProduct()
    }, [id])

    const fetchSingleProduct = () => {
        ApiServices.singleProduct({ _id: id })
            .then((res) => {
                if (res.data.success) {
                    // console.log(res);
                    setTitle(res.data.data.title)
                    setDescription(res.data.data.description)
                    setSize(res.data.data.size)
                    setGender(res.data.data.gender)
                    setType(res.data.data.type)
                    setPrice(res.data.data.price)
                    setPreviousImage(res.data.data.image)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err?.message)
            })
    }
    const changeImg = (e) => {
        setImageName(e.target.value)
        setImage(e.target.files[0]);
    }
    
    const nav = useNavigate()
    const handleForm = (e) => {
        e.preventDefault()
        
        setLoad(true)
       
        let formData = new FormData()
        formData.append("_id", id)
        formData.append("description", description)
        if (!!image) {
            formData.append("image", image)
        }
        formData.append("title", title)
        formData.append("size", size)
        formData.append("gender", gender)
        formData.append("type", type)
        formData.append("price", price)

        ApiServices.updateProduct(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    nav("/admin/product/manage")
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message);

            })
            .finally(() => {
                setTimeout(() => {
                    setLoad(false)
                }, 1000)
            })
    }
   return (
  <>
    <main className="main">
      <PageTitle>Update Product</PageTitle>

      <section
        className="section d-flex justify-content-center align-items-center"
        style={{marginTop:"7vh"}} >
        <HashLoader
          color="#d19c97"
          loading={load}
          cssOverride={{ display: "block", margin: "0 auto" }}
        />

        {!load && (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7 col-md-9">

                <div className="card shadow-lg border-0 rounded-4">
                  <div className="card-body p-4">

                    <h4 className="text-center mb-4 fw-semibold">
                      Update Product Details
                    </h4>

                    {/* Image Preview */}
                    {previousImage && (
                      <div className="text-center mb-4">
                        <img
                          src={previousImage}
                          alt="Product"
                          className="img-fluid rounded-3"
                          style={{
                            maxHeight: "200px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )}

                    <form onSubmit={handleForm}>

                      {/* Title */}
                      <div className="mb-3">
                        <label className="form-label fw-medium text-dark">
                          Product Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Product Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-3">
                        <label className="form-label fw-medium text-dark">
                          Description About Product
                        </label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Description About Product"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>

                      {/* Gender */}
                      <div className="mb-3">
                        <label className="form-label fw-medium text-dark">
                          Suitable For
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        />
                      </div>

                      {/* Size */}
                      <div className="mb-3">
                        <label className="form-label fw-medium text-dark">
                          Size
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Size"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          required
                        />
                      </div>

                      {/* Type */}
                      <div className="mb-3">
                        <label className="form-label fw-medium text-dark">
                          Type
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          required
                        />
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <label className="form-label fw-medium text-dark">
                          Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Price"
                          min={100}
                          max={50000}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>

                      {/* Image */}
                      <div className="mb-4">
                        <label className="form-label fw-medium text-dark">
                          Change Product Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          value={imageName}
                          onChange={changeImg}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="btn w-100 py-2 fw-semibold"
                        style={{
                          backgroundColor: "#d19c97",
                          color: "white",
                        }}
                      >
                        Update Product
                      </button>

                    </form>

                  </div>
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