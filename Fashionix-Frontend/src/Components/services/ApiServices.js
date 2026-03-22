import axios from "axios";
/* const BASE_URL = "http://localhost:5004" */
const BASE_URL = "/api"

class ApiServices {

    getToken() {
        let x = {
            headers: {
                Authorization: sessionStorage.getItem("token")
            }
        }
        return x;
    }

    login(formData) {
        return axios.post(BASE_URL + "/api/user/login", formData)
    }

    register(formData) {
        return axios.post(BASE_URL + "/api/customer/register", formData)
    }

    changePassword(formData) {
        return axios.post(BASE_URL + "/api/user/changePassword", formData, this.getToken())
    }


    // Admin Dashboard
    dashboard(formData) {
        return axios.post(BASE_URL + "/admin/dashboard/dashboard", formData, this.getToken())
    }

    // Admin Side

    // Brand APIs
    allBrand(formData) {
        return axios.post(BASE_URL + "/api/brand/all", formData)
    }

    changeStatusBrand(formData) {
        return axios.post(BASE_URL + "/admin/brand/changeStatus", formData, this.getToken())
    }

    addBrand(formData) {
        return axios.post(BASE_URL + "/admin/brand/add", formData, this.getToken())
    }

    updateBrand(formData) {
        return axios.post(BASE_URL + "/admin/brand/update", formData, this.getToken())
    }

    singleBrand(formData) {
        return axios.post(BASE_URL + "/api/brand/single", formData)
    }


    // Category APIs
    allCategory(formData) {
        return axios.post(BASE_URL + "/api/category/all", formData)
    }

    changeStatusCategory(formData) {
        return axios.post(BASE_URL + "/admin/category/changeStatus", formData, this.getToken())
    }

    addCategory(formData) {
        return axios.post(BASE_URL + "/admin/category/add", formData, this.getToken())
    }

    updateCategory(formData) {
        return axios.post(BASE_URL + "/admin/category/update", formData, this.getToken())
    }

    singleCategory(formData) {
        return axios.post(BASE_URL + "/api/category/single", formData)
    }


    // Product APIs
    addProduct(formData) {
        return axios.post(BASE_URL + "/admin/product/add", formData, this.getToken())
    }

    allProduct(formData) {
        return axios.post(BASE_URL + "/api/product/all", formData)
    }

    changeStatusProduct(formData) {
        return axios.post(BASE_URL + "/admin/product/changeStatus", formData, this.getToken())
    }

    singleProduct(formData) {
        return axios.post(BASE_URL + "/api/product/single", formData)
    }

    updateProduct(formData) {
        return axios.post(BASE_URL + "/admin/product/update", formData, this.getToken())
    }

    getAllBrandsForDropdown(formData) {
        return axios.post(BASE_URL + "/api/brand/all", formData)
    }

    getAllCategoriesForDropdown(formData) {
        return axios.post(BASE_URL + "/api/category/all", formData)
    }


    

    // Customer APIs
    changeStatusCustomer(formData) {
        return axios.post(BASE_URL + "/admin/customer/changeStatus", formData, this.getToken())
    }

    allCustomer(formData) {
        return axios.post(BASE_URL + "/admin/customer/all", formData, this.getToken())
    }

    singleCustomer(formData) {
        return axios.post(BASE_URL + "/admin/customer/single", formData, this.getToken())
    }


    // Customer Side - Cart APIs
    addToCart(formData) {
        return axios.post(BASE_URL + "/customer/cart/add", formData, this.getToken())
    }

    customerCartAll(formData) {
        return axios.post(BASE_URL + "/customer/cart/all", formData, this.getToken())
    }

    updateCart(formData) {
        return axios.post(BASE_URL + "/customer/cart/update", formData, this.getToken())
    }

    deleteCartItem(formData) {
        return axios.post(BASE_URL + "/customer/cart/deleteItem", formData, this.getToken())
    }


    // Order APIs
    orderAdd(formData) {
        return axios.post(BASE_URL + "/customer/order/add", formData, this.getToken())
    }

   /*  myOrders(formData) {
        return axios.post(BASE_URL + "/customer/order/allOrders", formData, this.getToken())
    } */
   myOrderDetails(formData) {
        return axios.post(BASE_URL + "/customer/orderdetails/all", formData, this.getToken())
    }   

    cancelOrder(formData) {
        return axios.post(BASE_URL + "/customer/order/cancel", formData, this.getToken())
    }

    allOrders(formData) {       
        return axios.post(BASE_URL + "/admin/order/all", formData, this.getToken())
    }

    updateOrderStatus(formData) {
        return axios.post(BASE_URL + "/admin/order/updateStatus", formData, this.getToken())
    }

    singleOrder(formData) {
        return axios.post(BASE_URL + "/admin/order/single", formData, this.getToken())
    }   
    

}

export default new ApiServices;