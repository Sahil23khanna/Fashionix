/* import PageTitle from "../../layouts/PageTitle";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";


export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        ApiServices.dashboard()
            .then((res) => {
                if (res.data.success) {

                    setDashboardData(res.data);
                    console.log("Dashboard data:", dashboardData);

                }
                else {
                    toast.error("Failed to load dashboard data");
                }
            })

            .catch((err) => {
                toast.error("An error occurred while fetching dashboard data");
            })

            .finally(() => {
                setLoad(false);
            });

    }, []);


    return (

        <>
            <PageTitle>Dashboard</PageTitle>

            <section>
                {load ? (
                    <HashLoader color="#d19c97" cssOverride={{ display: "block", margin: "0 auto" }} />
                ) : (
                    <div className="container my-5">
                        <div className="row g-4 p-2">
                            <DashboardCard title="Total Brands" count={dashboardData?.totalBrand} icon="bi-people" color="info" />
                            <DashboardCard title="Total Categories" count={dashboardData?.totalCategory} icon="bi-person-check" color="primary" />
                            <DashboardCard title="Total Products" count={dashboardData?.totalProduct} icon="bi-journal-text" color="success" />
                            <DashboardCard title="Total Customers" count={dashboardData?.totalCustomer} icon="bi-chat-square-dots" color="warning" />
                        </div>
                    </div>
                )}
            </section>

        </>
    )
}

function DashboardCard({ title, count, icon, color = "primary" }) {
    return (
        <div className="col-md-3 mb-4">
            <div
                className={`card text-white bg-${color} text-center p-4 h-100 rounded-4 shadow-sm`}
                style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.06)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                }}
            >
                <i className={`bi ${icon} fs-1`}></i>
                <h4 className="mt-3">{count ?? 0}</h4>
                <p className="text-white-50">{title}</p>
            </div>
        </div>
    );
} */

    import PageTitle from "../../layouts/PageTitle";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        ApiServices.dashboard()
            .then((res) => {
                if (res.data.success) {
                    setDashboardData(res.data);
                } else {
                    toast.error("Failed to load dashboard data");
                }
            })
            .catch(() => {
                toast.error("An error occurred while fetching dashboard data");
            })
            .finally(() => {
                setLoad(false);
            });
    }, []);

    return (
        <>
            <PageTitle>Dashboard</PageTitle>

            <section className="dashboard-section">

                {load ? (
                    <HashLoader
                        color="#ffffff"
                        cssOverride={{ display: "block", margin: "100px auto" }}
                    />
                ) : (
                    <div className="container dashboard-wrapper">
                        <div className="row g-4">

                            <DashboardCard
                                title="Total Brands"
                                count={dashboardData?.totalBrand}
                                icon="bi-box"
                                color="info"
                            />

                            <DashboardCard
                                title="Total Categories"
                                count={dashboardData?.totalCategory}
                                icon="bi-grid"
                                color="primary"
                            />

                            <DashboardCard
                                title="Total Products"
                                count={dashboardData?.totalProduct}
                                icon="bi-bag"
                                color="success"
                            />

                            <DashboardCard
                                title="Total Customers"
                                count={dashboardData?.totalCustomer}
                                icon="bi-people"
                                color="warning"
                            />

                        </div>
                    </div>
                )}

            </section>
        </>
    );
}

function DashboardCard({ title, count, icon, color }) {
    return (
        <div className="col-12 col-sm-6 col-lg-3">
            <div className="modern-card p-4">

                <div className="d-flex justify-content-between align-items-start">

                    <div>
                        <p className="card-label mb-2">{title}</p>
                        <h3 className="card-count">{count ?? 0}</h3>
                       {/*  <p className="card-change">
                            <span className="text-success fw-semibold">+5%</span>
                            <span className="text-muted"> since last month</span>
                        </p> */}
                    </div>

                    <div className={`icon-circle bg-${color}`}>
                        <i className={`bi ${icon}`}></i>
                    </div>

                </div>

            </div>
        </div>
    );
}