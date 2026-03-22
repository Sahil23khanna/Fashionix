import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import ApiServices from "../../services/ApiServices";
import { HashLoader } from "react-spinners";
import PageTitle from "../../layouts/PageTitle";

export default function AddProduct() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState({});
    const [imageName, setImageName] = useState("");
    const [load, setLoad] = useState(false);

    const [brandId, setBrandId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const changeImg = (e) => {
        setImageName(e.target.value);
        setImage(e.target.files[0]);
    };

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

   /* 
   
    ApiServices.getAllBrandsForDropdown()
      .then((res) => {
           console.log("Brand API response:", res.data);
        if (res.data.success) {
          setBrands(res.data.data);
        }
      });


    ApiServices.getAllCategoriesForDropdown()
      .then((res) => {
         console.log("Brand API response:", res.data);
        if (res.data.success) {
          setCategories(res.data.data);
        }
      });
  }, []); */

  useEffect(() => {
  ApiServices.getAllBrandsForDropdown({})
    .then((res) => {
      console.log("Brand API:", res.data);
      if (res.data.success) {
        setBrands(res.data.data);
      }
    })
    .catch(err => {
      console.error("Brand error:", err.response || err.message);
    });

  ApiServices.getAllCategoriesForDropdown({})
    .then((res) => {
      console.log("Category API:", res.data);
      if (res.data.success) {
        setCategories(res.data.data);
      }
    })
    .catch(err => {
      console.error("Category error:", err.response || err.message);
    });
}, []);


    const handleForm = (e) => {
        e.preventDefault();
        setLoad(true);

         if (Number(price) < 0) {
            toast.error("Price cannot be negative.");
            setLoad(false);
            return;
        }


        let formData = new FormData();

        formData.append("title", title);
        formData.append("description", description)
        formData.append("image", image);
        formData.append("gender", gender);
        formData.append("size", size);
        formData.append("type", type);
        formData.append("price", price);

        formData.append("brandId", brandId);
        formData.append("categoryId", categoryId);

        ApiServices.addProduct(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setDescription("")
                    setTitle("");
                    setGender("");
                    setSize("");
                    setType("");
                    setPrice("");
                    setImage({});
                    setImageName("");
                    setBrandId("");
                    setCategoryId("");
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
                <PageTitle>Add Product</PageTitle>

                <section
                    id="contact"
                    className="section d-flex justify-content-center align-items-center"
                    style={{  marginTop: "6vh"}}
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
                                            Add New Product
                                        </h3>

                                        <form method="post" onSubmit={handleForm} encType="multipart/form-data">
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="topicInput"
                                                    className="form-label fw-medium text-dark "
                                                >
                                                    Product Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="ProductInput"
                                                    placeholder="Enter Product Title"
                                                    required
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    htmlFor="descriptionInput"
                                                    className="form-label fw-medium text-dark"
                                                >
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="descriptionInput"
                                                    placeholder="Description About Product"
                                                    required
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>

                                              <div className="mb-4">
                                                <label
                                                    htmlFor="GenderInput"
                                                    className="form-label fw-medium text-dark"
                                                >
                                                    Gender
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="GenderInput"
                                                    placeholder="Gender"
                                                    required
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                            </div>

                                              <div className="mb-4">
                                                <label
                                                    htmlFor="sizeInput"
                                                    className="form-label fw-medium text-dark "
                                                >
                                                    Size            
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="sizeInput"
                                                    placeholder="Size"
                                                    required
                                                    value={size}
                                                    onChange={(e) => setSize(e.target.value)}
                                                />
                                            </div>

                                              <div className="mb-4">
                                                <label
                                                    htmlFor="typeInput"
                                                    className="form-label fw-medium text-dark"
                                                >
                                                    Type        
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="typeInput"
                                                    placeholder="Type"
                                                    required
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
                                                />
                                            </div>


                                              <div className="mb-4">
                                                <label
                                                    htmlFor="PriceInput"
                                                    className="form-label fw-medium text-dark"
                                                >
                                                    Price           
                                                </label>
                                                <input
                                                    type="Number"
                                                    className="form-control"
                                                    id="PriceInput"
                                                    placeholder="Price"
                                                    min={100}
                                                    max={50000}
                                                    required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label
                                                    htmlFor="imageInput"
                                                    className="form-label fw-medium text-dark"
                                                >
                                                    Image
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

        {/* Brand Dropdown */}
        <select
          className="form-control mb-3"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.brandName}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          className="form-control mb-3"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>

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
