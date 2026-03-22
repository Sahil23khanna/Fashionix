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

export default function ManageCustomer() {

    const [customer, setCustomer] = useState([])
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        fetchCustomer()
    }, [filter, currentPage])


    const fetchCustomer = () => {
        setLoad(true)
        let formData = {
            limit: LIMIT,
            currentPage: currentPage
        }

        if (!!filter) {
            formData.status = filter
        }

        ApiServices.allCustomer(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)

                    setCustomer(res.data.data)
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

    const changeStatusCustomer = (id, status) => {
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
                ApiServices.changeStatusCustomer(formData)
                    .then((res) => {
                        if (res.data.success) {
                            toast.success(res.data.message)

                            fetchCustomer()
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
            <main className="main">
                <PageTitle>Manage Customers</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "5vh" }}>

                    {load ?
                        <HashLoader color="#d19c97" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >

                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12 table-responsive">
                                    <table className="table shadow-sm table-hover table-striped">
                                        <thead style={{ backgroundColor: "#121212e3", color: "#fff" }}>
                                            <tr>
                                                <th>Sno.</th>
                                                {/* <th>Profile</th> */}
                                                <th>Customer Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Address</th>
                                                {/* <th>Education Level</th>
                                                <th>Topics Interested</th> */}
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {customer?.map((customer, index) => (
                                                <tr>
                                                    <td>{(currentPage - 1) * LIMIT + index + 1}</td>



                                                    <td>{customer?.userId?.name}</td>
                                                    <td>{customer?.userId?.email}</td>
                                                    <td>{customer?.phone}</td>
                                                    <td>{customer?.address}</td>

                                                    {/*  <td>{customer?.educationLevel}</td>
                                                    <td>{customer?.topicInterested?.map((t) => t.topic).join(", ")} </td> */}




                                                    <td className="">
                                                        <div className="d-flex  align-items-center">

                                                            <Link to={"/admin/customer/view/" + customer?.userId?._id} className=" btn btn-outline-info btn-md">
                                                                <i className="bi bi-eye"></i>
                                                            </Link>

                                                            <button className="btn ">
                                                                <Switch onChange={() => {
                                                                    changeStatusCustomer(customer?.userId?._id, customer?.status)
                                                                }} checked={customer?.status}

                                                                />
                                                            </button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))}

                                        </tbody>
                                        {/*   <tfoot>
                                            <tr>
                                                <td colSpan={10} >
                                                    <div className="d-flex justify-content-center mt-3">
                                                        <ResponsivePagination
                                                            className="custom-pagination"
                                                            current={currentPage}
                                                            total={Math.ceil(total / LIMIT)}
                                                            onPageChange={setCurrentPage}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot> */}
                                    </table>
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
                        </div>
                    }
                </section>
                {/* /Contact Section */}
            </main>


        </>
    )
}