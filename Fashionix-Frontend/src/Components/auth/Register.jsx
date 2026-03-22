import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PageTitle from "../layouts/PageTitle"
import ApiServices from "../services/ApiServices"


export default function Register() {

    
    const [name, setName]=useState("")
    const [email,setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const nav=useNavigate()

    const handleForm=(e)=>{
        e.preventDefault();
        //axios.method(url, body, headers)
        let formData={
            name:name,
            email:email,
            password:password,
            phone:phone,
            address:address
        }
     
    ApiServices.register(formData)
    .then((res)=>{
           if(res.data.success){
                toast.success(res.data.message)
                let data = {
                  email:email,
                  password:password
                }  
            
            ApiServices.login(formData)
            .then((res)=>{
                if(res.data.success){
                  toast.success(res.data?.message)
                        sessionStorage.setItem("isLogin", true)
                        sessionStorage.setItem("token", res.data.token)
                        sessionStorage.setItem("name",res.data.data.name)
                        sessionStorage.setItem("userId",res.data.data._id)
                        sessionStorage.setItem("userType", res.data.data.userType)

                         if(res.data?.data?.userType==1){
                            nav("/admin")
                        }
                        
                        else{
                            nav("/")
                        }
                }

                else{
                        toast.error(res.data?.message)
                    }
            })

            .catch((err)=>{
                toast.error(err?.message)
            })

           }

           else{
            toast.error(res.data.message)
           }   
    })

    .catch((err)=>{
      toast.error(err?.message)
    })
}



    return (
        <>
            <PageTitle>Sign Up</PageTitle>

            {/* <section className="min-vh-100 border border-danger">
                <div className="container  h-100 border border-danger ">

                  

                    <div >
                        <div className="col-md-8 col-lg-7 col-xl-6 ">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid"
                                alt="Phone image"
                            />
                        </div>

                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 ">
                            <form onSubmit={handleForm}>
                                
                                
                                <div data-mdb-input-init="" className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form1Example131"
                                        className="form-control form-control-lg"
                                        name="name"
                                        required
                                        value={name}
                                        onChange={(e)=>{setName(e.target.value) }}
                                      
                                    />
                                    <label className="form-label" htmlFor="form1Example13">
                                        Name
                                    </label>
                                </div>

                                
                                <div data-mdb-input-init="" className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form1Example132"
                                        name="email"
                                        required
                                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                    <label className="form-label" htmlFor="form1Example13">
                                        Email address
                                    </label>
                                </div>

                             
                                <div data-mdb-input-init="" className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form1Example23"
                                        name="password"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form1Example23">
                                        Password
                                    </label>
                                </div>
                                
                               
                                <div data-mdb-input-init="" className="form-outline mb-4">
                                    <input
                                        type="tel"
                                        id="form1Example233"
                                        className="form-control form-control-lg"
                                        name="phone"
                                        pattern="[0-9]{10}"
                                        value={phone}
                                        minLength={10}
                                        maxLength={10}
                                        onChange={(e)=>{
                                            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                            setPhone(onlyNums);
                                        }}
                                        required


                                    />
                                    <label className="form-label" htmlFor="form1Example234">
                                        Contact 
                                    </label>
                                </div>

                               
                                 <div data-mdb-input-init="" className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form1Example2355"
                                        name="address"
                                        className="form-control form-control-lg"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form1Example23">
                                        Address
                                    </label>
                                </div>

                               
                                <button
                                    type="submit"
                                    data-mdb-button-init=""
                                    data-mdb-ripple-init=""
                                    className="btn btn-primary btn-lg btn-block"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section> */}
         

<section className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
  <div className="container">
    <div className="row justify-content-center">
      
      <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
        <div className="card shadow border-0 p-4 rounded-4">
          
          <h4 className="text-center fw-bold mb-4">Create Account</h4>

          <form onSubmit={handleForm}>
            
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                maxLength={10}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/[^0-9]/g, ""))
                }
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn w-100 btn-lg text-white"
              style={{background:"#d19c97"}}
            >
              Sign Up
            </button>

          </form>

        </div>
      </div>

    </div>
  </div>
</section>



        </>
    )
}