import { useEffect, useState } from "react"
import ApiServices from "../../services/ApiServices"
import PageTitle from "../../layouts/PageTitle"
import { toast } from "react-toastify"
import { HashLoader } from "react-spinners"
import Switch from "react-switch"
import { Link } from "react-router-dom"
import Pagination, { LIMIT } from "../../utilities/Pagination"
import ResponsivePagination from "react-responsive-pagination"
import 'react-responsive-pagination/themes/classic.css';
import Swal from "sweetalert2"

export default function ManageProduct() {

  const [product, setProduct] = useState([])
  const [load, setLoad] = useState(true)
  const [filter, setFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState()
  const [gender, setGender] = useState("")
  const [size, setSize] = useState("")
  const [brand, setBrand] = useState("")
  const [brands, setBrands] = useState([])
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])



  useEffect(() => {
    fetchProduct()
  }, [filter, currentPage, gender, size, brand, category])


  const fetchProduct = () => {
    setLoad(true)

    let formData = {
      limit: LIMIT,
      currentPage: currentPage
    }

    if (!!filter) {
      formData.status = filter
    }

    if (gender) formData.gender = gender
    if (size) formData.size = size
    if (brand) formData.brandId = brand
    if (category) formData.categoryId = category

    ApiServices.allProduct(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)

          setProduct(res.data.data)
          setTotal(res.data.total)
        }
        else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        toast.error(err.message)
      })
      .finally(() => {
        setTimeout(() => {

          setLoad(false)
        }, 1000)

      })
  }

  useEffect(() => {
    ApiServices.allBrand({})
      .then((res) => {
        console.log("Brand API:", res.data);
        if (res.data.success) {
          setBrands(res.data.data)
        }
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])

  useEffect(() => {
    ApiServices.allCategory({})
      .then((res) => {
        console.log("Category API:", res.data);
        if (res.data.success) {
          setCategories(res.data.data)
        }
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }, [])




  const changeStatusProduct = (id, status) => {
    Swal.fire({
      title: `You are about to ${status ? "disable" : "enable"} status`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d19c97",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Update It !!"
    }).then((result) => {
      if (result.isConfirmed) {
        let formData = {
          _id: id,
          status: !status
        }
        ApiServices.changeStatusProduct(formData)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message)
              // window.location.reload()
              fetchProduct()
              Swal.fire({
                title: `${status ? "disabled" : "enabled"}!`,
                text: `${status ? "disabled" : "enabled"} successfully!!`,
                icon: "success"
              });
            } else {
              toast.error(res.data.message)
            }
          })
          .catch((err) => {
            toast.error(err?.message)
          })
          .finally(() => {
            setLoad(false)
          })

      }
    });



  }

  return (
    <>

      <style>
        {`
.product-card {
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

/* Image (CENTERED like before) */
.product-img-wrapper {
   height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #eef1f5);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.product-img {
   max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  display: block;
}

/* Card Body */
.card-body {
  padding: 14px;
}

.product-title {
  font-size: 15px;
  font-weight: 600;
  color: #212529;
  text-align: center;
  margin-bottom: 10px;
}

/* Product Info with Labels */
.product-info {
  font-size: 13px;
  color: #495057;
  margin-bottom: 6px;
}

.product-info span {
  font-weight: 600;
  color: #212529;
}

/* Action Buttons */
.action-btns {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.action-btns .btn {
  border-radius: 50%;
  transition: all 0.3s ease;
}

.action-btns .btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}

/* Toolbar */
.toolbar {
  background: #ffffff;
  border-radius: 14px;
  padding: 8px 20px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

/* Filter */
.styled-select {
  border-radius: 25px;
  padding: 6px 12px;
  border: 1px solid #dee2e6;
  font-weight: 500;
  cursor: pointer;
}

.styled-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.15rem rgba(13,110,253,.25);
}

/* Add Button */
.add-btn {
  border-radius: 25px;
  padding: 6px 20px;
  font-weight: 600;
  background: linear-gradient(135deg, #0d6efd, #0a58ca);
  color: #fff;
  border: none;
}

.add-btn:hover {
  background: linear-gradient(135deg, #0a58ca, #084298);
  color: #fff;
}

/* Status Pill */
.status-pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 4px;
  display: block;
}

/* Make select full width */
.styled-select {
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 14px;
  width: 100%;
}

/* Toolbar spacing */
.toolbar {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

/* Mobile spacing */
@media (max-width: 576px) {
  .toolbar {
    padding: 15px;
  }
}

`}
      </style>

      <main className="main">
        <PageTitle>Manage Products</PageTitle>
        <section id="contact" className="contact section " style={{ marginTop: "7vh", marginBottom: "8vh" }}>

          {load ?
            <HashLoader color="#d19c97" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
            :

            <div className="container my-4 py-4" style={{ backgroundColor: "#f4f6f9", borderRadius: "12px" }}>

              <div className="row mb-4">
                <div className="col-12">
                  {/*   <div className="toolbar d-flex flex-wrap justify-content-between align-items-center gap-3">

                
                    <div className="d-flex align-items-center gap-2">
                      <span className="status-pill bg-light text-dark">
                        Status
                      </span>
                      <select
                        className="styled-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}>
                        <option value={""}>All</option>
                        <option value={"true"}>Active</option>
                        <option value={"false"}>Inactive</option>
                      </select>

                      <span className="status-pill bg-light text-dark">
                        SuitableFor
                      </span>
                      <select
                        className="styled-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}>
                        <option value="">All</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>


                      <span className="status-pill bg-light text-dark">
                        Sizes
                      </span>
                      <select
                        className="styled-select"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        <option value="">All</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XS">XS</option>
                      </select>


                      
                      <span className="status-pill bg-light text-dark">Brands</span>
                      <select
                        className="styled-select"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        <option value="">All</option>
                        {brands.map((b) => (
                          <option key={b._id} value={b._id}>
                            {b.brandName}
                          </option>
                        ))}
                      </select>


                    
                      <span className="status-pill bg-light text-dark">Categories</span>
                      <select
                        className="styled-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">All</option>
                        {categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.categoryName}
                          </option>
                        ))}
                      </select>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => {
                          setGender("")
                          setSize("")
                          setBrand("")
                          setCategory("")
                          setCurrentPage(1)
                        }}
                      >
                        Reset
                      </button>

                    </div>



                   
                    <Link to="/admin/product/add" className="add-btn">
                      <i className="bi bi-plus-lg me-2"></i>
                      Add New product
                    </Link>

                  </div> */}
                  <div className="toolbar">

                    <div className="row g-3 align-items-end">

                      {/* Status */}
                      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <label className="filter-label">Status</label>
                        <select
                          className="styled-select w-100"
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>

                      {/* Gender */}
                      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <label className="filter-label">Suitable For</label>
                        <select
                          className="styled-select w-100"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                          <option value="Unisex">Unisex</option>
                        </select>
                      </div>

                      {/* Size */}
                      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <label className="filter-label">Size</label>
                        <select
                          className="styled-select w-100"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XS">XS</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <label className="filter-label">Brand</label>
                        <select
                          className="styled-select w-100"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          <option value="">All</option>
                          {brands.map((b) => (
                            <option key={b._id} value={b._id}>
                              {b.brandName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Category */}
                      <div className="col-12 col-sm-6 col-md-4 col-lg-2">
                        <label className="filter-label">Category</label>
                        <select
                          className="styled-select w-100"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">All</option>
                          {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Reset */}
                      <div className="col-6 col-sm-6 col-md-2 col-lg-1">
                        <button
                          className="btn btn-outline-secondary w-100"
                          onClick={() => {
                            setGender("")
                            setSize("")
                            setBrand("")
                            setCategory("")
                            setFilter("")
                            setCurrentPage(1)
                          }}
                        >
                          Reset
                        </button>
                      </div>

                     
                      <div className="col-6 col-sm-6 col-md-3 col-lg-1 text-end">
                        <Link to="/admin/product/add" style={{backgroundColor:"#d19c97", color:"white", padding:"3px 6px", borderRadius:"6px", textDecoration:"none"}} className="btn ">
                          + Add
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              </div>


              <div className="row g-4">
                {product?.map((product, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={product._id}>
                    <div className="card product-card h-100">

                      {/* Image */}
                      <div className="product-img-wrapper">
                        <img
                          src={product?.image}
                          alt={product?.title}
                          className="product-img"
                        />

                      </div>

                      {/* Body */}
                      <div className="card-body d-flex flex-column">

                        <h6 className="product-title">{product?.title}</h6>

                        <p className="product-info">
                          <span>Price:</span> ₹{product?.price}
                        </p>

                        <p className="product-info">
                          <span>Size:</span> {product?.size}
                        </p>

                        <p className="product-info">
                          <span>Type:</span> {product?.type}
                        </p>

                        <p className="product-info">
                          <span>SuitableFor:</span> {product?.gender}
                        </p>

                        <p className="product-info">
                          <span>Category:</span> {product?.categoryId?.categoryName}
                        </p>

                        <p className="product-info">
                          <span>Brand:</span> {product?.brandId?.brandName}
                        </p>

                        <div className="action-btns">
                          <Link to={`/admin/product/view/${product?._id}`} className="btn btn-outline-info btn-sm">
                            <i className="bi bi-eye"></i>
                          </Link>

                          <Link to={`/admin/product/update/${product?._id}`} className="btn btn-outline-success btn-sm">
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                          <Switch
                            onChange={() =>
                              changeStatusProduct(product?._id, product?.status)
                            }
                            checked={product?.status}
                            onColor="#198754"
                            height={20}
                            width={40}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
              <div className="d-flex justify-content-center mt-4">
                <ResponsivePagination 
                 className="custom-pagination"
                  current={currentPage}
                  total={Math.ceil(total / LIMIT)}
                  onPageChange={setCurrentPage}
                />
              </div>

            </div>
          }
        </section>

      </main>

    </>
  )

}



