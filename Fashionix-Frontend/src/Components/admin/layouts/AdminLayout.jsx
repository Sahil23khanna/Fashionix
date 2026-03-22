import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader"
import AdminFooter from "./AdminFooter"

export default function AdminLayout(){
    return(
        <>
        <AdminHeader />
        <Outlet />
        <AdminFooter />
        </>
    )
}