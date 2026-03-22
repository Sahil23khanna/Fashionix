import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, Bounce } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Home from "./Components/pages/Home"
import Layout from "./Components/layouts/Layout"
import Contact from "./Components/pages/Contact"
import Shop from "./Components/pages/Shop"
import Login from "./Components/auth/Login"
import ProductDetail from "./Components/pages/ProductDetail"
import Checkout from "./Components/pages/Checkout"
import Error from "./Components/pages/Error"
import AdminLayout from "./Components/admin/layouts/AdminLayout"
import Register from "./Components/auth/Register"
import Style from "./Components/pages/Style"
import Dashboard from "./Components/admin/dashboard/Dashboard"
import ManageBrand from "./Components/admin/brand/ManageBrand"
import AddBrand from "./Components/admin/brand/AddBrand"
import EditBrand from "./Components/admin/brand/EditBrand"
import ViewBrand from "./Components/admin/brand/ViewBrand"
import ManageCategory from "./Components/admin/category/ManageCategory"
import AddCategory from "./Components/admin/category/AddCategory"
import EditCategory from "./Components/admin/category/EditCategory"
import ViewCategory from "./Components/admin/category/ViewCategory"
import AddProduct from "./Components/admin/product/AddProduct"
import ManageProduct from "./Components/admin/product/ManageProduct"
import EditProduct from "./Components/admin/product/EditProduct"
import ViewProduct from "./Components/admin/product/ViewProduct"
import ChangePassword from "./Components/pages/ChangePassword"
import ManageCustomer from "./Components/admin/customers/ManageCustomer"
import ViewCustomer from "./Components/admin/customers/ViewCustomer"
import Order from "./Components/pages/Order"
import ManageOrder from "./Components/admin/order/ManageOrder"
import ViewOrder from "./Components/admin/order/ViewOrder"

function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/order" element={<Order />} />
            <Route path="/style" element={<Style />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/changePassword" element={<ChangePassword />} />

          </Route>

          <Route path="/admin" element={<AdminLayout />}>

            <Route path="/admin" element={<Dashboard />} />

            <Route path="/admin/brand/manage" element={<ManageBrand />} />
            <Route path="/admin/brand/add" element={<AddBrand />} />
            <Route path="/admin/brand/update/:id" element={<EditBrand />} />
            <Route path="/admin/brand/view/:id" element={<ViewBrand />} />

            <Route path="/admin/category/manage" element={<ManageCategory />} />
            <Route path="/admin/category/add" element={<AddCategory />} />
            <Route path="/admin/category/update/:id" element={<EditCategory />} />
            <Route path="/admin/category/view/:id" element={<ViewCategory />} />

            <Route path="/admin/product/add" element={<AddProduct />} />
            <Route path="/admin/product/manage" element={<ManageProduct />} />
            <Route path="/admin/product/update/:id" element={<EditProduct />} />
            <Route path="/admin/product/view/:id" element={<ViewProduct />} />

            <Route path="/admin/customer/manage" element={<ManageCustomer />} />
            <Route path="/admin/customer/view/:id" element={<ViewCustomer />} />

            <Route path="/admin/order/manage" element={<ManageOrder />} />
            <Route path="/admin/order/view/:id" element={<ViewOrder />} />

          </Route>

          <Route path="/*" element={<Error />} />

        </Routes>
      </BrowserRouter>



      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />


    </>
  )
}

export default App
