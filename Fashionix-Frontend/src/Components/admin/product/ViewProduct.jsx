import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";


export default function ViewProduct() {

    const { id } = useParams()

    const [product, setProduct] = useState({})
    const [load, setLoad] = useState(true)

    useEffect(() => {
        fetchSingleProduct()
    }, [id])
    const fetchSingleProduct = () => {
        let formData = {
            _id: id
        }
        ApiServices.singleProduct(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    setProduct(res.data.data)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err?.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoad(false)
                }, 500)
            })

    }


    return (
        <>
            <PageTitle>View Product</PageTitle>

            <section
                className="section d-flex justify-content-center"
                style={{ marginTop:"7vh"}}
            >
                <div className="container">

                    <HashLoader
                        loading={load}
                        color="#d19c97"
                        cssOverride={{ display: "block", margin: "0 auto" }}
                    />

                    {!load && product && (
                        <div className="row justify-content-center">

                            <div className="col-lg-10">
                                <div className="card shadow-lg border-0 rounded-4 overflow-hidden">

                                    <div className="row g-0">

                                        {/* LEFT IMAGE */}
                                        <div className="col-md-6 bg-light d-flex align-items-center justify-content-center p-4">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="img-fluid rounded-3"
                                                style={{
                                                    maxHeight: "400px",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </div>

                                        {/* RIGHT DETAILS */}
                                        <div className="col-md-6 p-5">

                                            <h3 className="fw-bold mb-3">
                                                {product.title}
                                            </h3>

                                            <h4
                                                className="fw-bold mb-4"
                                                style={{ color: "#d19c97" }}
                                            >
                                                ₹ {product.price}
                                            </h4>

                                            <div className="mb-3">
                                                <p><strong>Size:</strong> {product.size}</p>
                                                <p><strong>Type:</strong> {product.type}</p>
                                                <p><strong>Suitable For:</strong> {product.gender}</p>
                                                <p><strong>Brand:</strong> {product?.brandId?.brandName}</p>
                                                <p><strong>Category:</strong> {product?.categoryId?.categoryName}</p>
                                                <p>
                                                    <strong>Status:</strong>{" "}
                                                    {product.status ? (
                                                        <span className="text-success">Available</span>
                                                    ) : (
                                                        <span className="text-danger">Unavailable</span>
                                                    )}
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                {/* DESCRIPTION CARD */}
                                <div className="card shadow-sm border-0 rounded-4 mt-4">
                                    <div className="card-body p-4">
                                        <h5 className="fw-semibold mb-3">Product Description</h5>
                                        <p className="text-muted">{product.description}</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )}

                </div>
            </section>
        </>
    );
}