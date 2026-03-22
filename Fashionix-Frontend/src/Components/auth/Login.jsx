import { useState } from "react"
import { useNavigate,Link} from "react-router-dom"
import { toast } from "react-toastify"
import { RotateLoader } from "react-spinners"
import ApiServices from "../services/ApiServices"


export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()
  const [load, setLoad] = useState(false)

  const handleForm= (e) =>{
    e.preventDefault() 

    let formData={
      email:email,
      password:password
    }
    ApiServices.login(formData)

    .then((res)=>{

      if (res.data.success) {
      
          sessionStorage.setItem("isLogin", true)
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("name", res.data.data.name)
          sessionStorage.setItem("userId", res.data.data._id)
          sessionStorage.setItem("userType", res.data.data.userType)
        
         if (res.data?.data?.userType == 1) {
            toast.success(res.data?.message)
            nav("/admin")
          }

           else {
            toast.success(res.data?.message)
            nav("/");
          }
      }
  else {
          toast.error(res.data?.message)
        }

    })

     .catch((error) => {
        toast.error(error?.message)
      })
  }

  return (
    <>
       
      <section className="vh-100" style={{marginTop:"12vh"}}>
        <div className="container h-100">

          <RotateLoader color="#d19c97" size={15} cssOverride={{ display: "block", margin: "0 auto", marginTop: "150px" }} loading={load} />

          <div className={
            load === true
              ? "d-none"
              : "row d-flex align-items-center justify-content-center h-100"
          }>
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>

            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 ">
              <form onSubmit={handleForm}>

                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                  Log in
                </h3>
                {/* Email input */}
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>

                {/* Password input */}
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  data-mdb-button-init=""
                  data-mdb-ripple-init=""
                  className="btn btn-lg btn-block"
                  style={{ backgroundColor: "#d19c97", color: "white" }}
                >
                  Login
                </button>
              </form>
              <h6 className="mt-4">New to Fashionix? <Link to="/register" className="text-decoration-none themecolor">Create an Account</Link></h6>
            </div>
          </div>

        </div>
      </section>


    </>
  )
}