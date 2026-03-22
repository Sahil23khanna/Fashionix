import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import PageTitle from "../../layouts/PageTitle";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import Swal from "sweetalert2";
import { LIMIT } from "../../utilities/Pagination";

export default function ManageOrder() {

    const [orders, setOrders] = useState([]);
    const [load, setLoad] = useState(true);
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, [filter, currentPage]);

    const fetchOrders = () => {
        setLoad(true);

        let formData = {
            limit: LIMIT,
            currentPage: currentPage
        }

        if (!!filter) {
            formData.status = filter
        }

        ApiServices.allOrders(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)

                    setOrders(res.data.data)
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

    const updateOrderStatus = (id, status) => {
        Swal.fire({
            title: "Update Order Status?",
            text: `Change status to ${status}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
            confirmButtonColor: "#d19c97",
      cancelButtonColor: "#6c757d"
        }).then((result) => {
            if (result.isConfirmed) {
                ApiServices.updateOrderStatus({
                    _id: id,
                    status: status
                })
                    .then((res) => {
                        if (res.data.success) {
                            toast.success(res.data.message);
                            fetchOrders();
                        } else {
                            toast.error(res.data.message);
                        }
                    })
                    .catch((err) => toast.error(err.message));
            }
        });
    };

    return (
        <main className="main">
            <PageTitle>Manage Orders</PageTitle>

            <section className="section" style={{ marginTop: "8vh"}}>
                {load ? (
                    <HashLoader color="#d19c97" cssOverride={{ display: "block", margin: "0 auto" }} />
                ) : (
                    <div className="container">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover shadow-sm">
                                <thead className="table-dark">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Customer</th>
                                        <th>Shipping Address</th>

                                        <th>Total Price</th>
                                        <th>Order Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                        <th>View Details</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((ord, index) => (
                                        <tr key={ord._id}>
                                            <td>{(currentPage - 1) * LIMIT + index + 1}</td>



                                            <td>
                                                {ord.addedById?.name} <br />
                                                <small>{ord.addedById?.email}</small>
                                            </td>

                                            <td>{ord.shippingAddress}</td>
                                            <td>₹{ord.totalPrice}</td>



                                            <td>{new Date(ord.createdAt).toLocaleDateString()}</td>


                                            <td>
                                                <span className={`badge 
                          ${ord.status === "Placed" ? "bg-warning" :
                                                        ord.status === "Shipped" ? "bg-info" :
                                                            ord.status === "Delivered" ? "bg-success" :
                                                                "bg-danger"}`}>
                                                    {ord.status}
                                                </span>
                                            </td>


                                            <td>

                                                {ord.status === "Placed" && (
                                                    <button
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => updateOrderStatus(ord._id, "Shipped")}
                                                    >
                                                        Ship
                                                    </button>
                                                )}

                                                {ord.status === "Shipped" && (
                                                    <button
                                                        className="btn btn-outline-success btn-sm"
                                                        onClick={() => updateOrderStatus(ord._id, "Delivered")}
                                                    >
                                                        Deliver
                                                    </button>
                                                )}
                                            </td>


                                            <td className="text-center">
                                                <Link
                                                    to={`/admin/order/view/${ord._id}`}
                                                    className="btn btn-outline-info btn-sm me-2 "
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </Link>

                                            </td>



                                        </tr>
                                    ))}
                                </tbody>

                                {/*  <tfoot>
                                    <tr>
                                        <td colSpan={8}>
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

                        <div className="d-flex justify-content-center mt-3">
                            <ResponsivePagination
                                className="custom-pagination"
                                current={currentPage}
                                total={Math.ceil(total / LIMIT)}
                                onPageChange={setCurrentPage}
                            />
                        </div>

                    </div>
                )}
            </section>
        </main>
    );
}
