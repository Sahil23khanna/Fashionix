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

export default function ManageCategory() {

  const [category, setCategory] = useState([])
  const [load, setLoad] = useState(true)
  const [filter, setFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState()


  useEffect(() => {
    fetchCategory()
  }, [filter, currentPage])


  const fetchCategory = () => {
    setLoad(true)
    let formData = {
      limit: LIMIT,
      currentPage: currentPage
    }

    if (!!filter) {
      formData.status = filter
    }

    ApiServices.allCategory(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)

          setCategory(res.data.data)
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


  const changeStatusCategory = (id, status) => {
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
        ApiServices.changeStatusCategory(formData)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message)
              // window.location.reload()
              fetchCategory()
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
.category-card {
  border-radius: 16px;
  background: #ffffff;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.category-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.category-img-wrapper {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #eef1f5);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
}

.category-img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.card-body h6 {
  color: #212529;
}

.toolbar {
  background: #ffffff;
  border-radius: 14px;
  padding: 5px 20px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

.styled-select {
  border-radius: 25px;
  padding: 5px 10px;
  border: 1px solid #dee2e6;
  font-weight: 500;
  cursor: pointer;
}

.styled-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.15rem rgba(13,110,253,.25);
}

.add-btn {
  border-radius: 25px;
  padding: 5px 18px;
  font-weight: 500;
  background: linear-gradient(135deg, #0d6efd, #0a58ca); 
  color: #fff;
  border: none;
}

.add-btn:hover {
  background: linear-gradient(135deg, #0a58ca, #084298);
  color: #fff;
}

.status-pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

`}
      </style>

      <main className="main">
        <PageTitle>Manage categories</PageTitle>
        <section id="contact" className="contact section " style={{ marginTop: "7vh", marginBottom: "8vh" }}>

          {load ?
            <HashLoader color="#d19c97" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
            :
           
            <div className="container my-4 py-4" style={{ backgroundColor: "#f4f6f9", borderRadius: "12px" }}>
            
              <div className="row mb-4">
                <div className="col-12">
                  <div className="toolbar d-flex flex-wrap justify-content-between align-items-center gap-3">

                    {/* Filter */}
                    <div className="d-flex align-items-center gap-2">
                      <span className="status-pill bg-light text-dark">
                        Status
                      </span>

                      <select
                        className="styled-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option value={""}>All</option>
                        <option value={"true"}>Active</option>
                        <option value={"false"}>Inactive</option>
                      </select>
                    </div>

                
                    <Link to="/admin/category/add" style={{backgroundColor:"#d19c97", color:"white", padding:"2px 10px", borderRadius:"6px", textDecoration:"none"}}>
                     
                      Add New Category
                    </Link>

                  </div>
                </div>
              </div>

             
              <div className="row g-4">
                {category?.map((category, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={category._id}>
                    <div className="card category-card shadow-sm h-100">

                      {/* Image */}
                      <div className="category-img-wrapper">
                        <img
                          src={category?.image}
                          alt={category?.categoryName}
                          className="category-img"
                        />
                      </div>

                      {/* Body */}
                      <div className="card-body text-center">
                        <h6 className="fw-semibold mb-3">
                          {category?.categoryName}
                        </h6>
                        <p>{category?.description}</p>

                        {/* Actions */}
                        <div className="d-flex justify-content-center gap-2 mb-2">
                          <Link
                            to={`/admin/category/view/${category?._id}`}
                            className="btn btn-outline-info btn-sm"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>

                          <Link
                            to={`/admin/category/update/${category?._id}`}
                            className="btn btn-outline-success btn-sm"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                        </div>

                        {/* Status Switch */}
                        <div className="d-flex justify-content-center">
                          <Switch
                            onChange={() =>
                              changeStatusCategory(category?._id, category?.status)
                            }
                            checked={category?.status}
                            onColor="#28a745"
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



