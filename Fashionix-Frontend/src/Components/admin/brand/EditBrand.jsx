 import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle"
import ApiServices from "../../services/ApiServices";
import { HashLoader } from "react-spinners";


export default function EditBrand(){
    const {id}=useParams()    
    const [brandName,setBrandName]=useState("")
    
    const [image,setImage]=useState(null)
    const [imageName,setImageName]=useState("")
    const [previousImage,setPreviousImage]=useState("")

    const [load,setLoad]=useState(false)

    useEffect(()=>{
        fetchSingleBrand()
    },[id])

    const fetchSingleBrand=()=>{
        ApiServices.singleBrand({_id:id})
        .then((res)=>{
            if(res.data.success){
                // console.log(res);
                setBrandName(res.data.data.brandName)
               
                setPreviousImage(res.data.data.image)
            }else{
                toast.error(res.data.message)
            }
        })
        .catch((err)=>{
            toast.error(err?.message)
        })
    }
    const changeImg=(e)=>{
        setImageName(e.target.value)
        setImage(e.target.files[0]);
    }
   
    const nav=useNavigate()
    const handleForm=(e)=>{
        e.preventDefault()
       
        setLoad(true)
         
        let formData=new FormData()
        formData.append("_id", id)
        formData.append("brandName",brandName)
        
        if(!!image){
            formData.append("image", image)
        }
        ApiServices.updateBrand(formData)
        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                nav("/admin/brand/manage")
            }else{
                toast.error(res.data.message)
            }       
        })
        .catch((err)=>{
            toast.error(err.message);
            
        })
        .finally(()=>{
            setTimeout(()=>{
                setLoad(false)
            },1000)
        })
    }
    /*
    return(
        <>
            <main className="main">
                <PageTitle>Update Brand</PageTitle>
                <section id="contact" className="contact section">
            
                <HashLoader color="#d19c97" loading={load} cssOverride={{display:"block", margin:"0 auto"}}/>
           
                <div className={load?"d-none":"container"} >
                    <div className="row justify-content-center gy-4">
                
                    <div className="col-lg-8">
                        <img src={previousImage} style={{height:"200px", width:"250px", display:"block", margin:"10px  auto"}}/>
                    

 <form method="post" onSubmit={handleForm}>

                                    <div className="form-group mb-5 pt-2 pb-2"> 
                                        <label htmlFor="exampleInputEmail1">Brand</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Brand"
                                            name="brand"
                                            required=""
                                            value={brandName}
                                            onChange={(e)=>{setBrandName(e.target.value)}}
                                        />
                                    </div>

                                     <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="exampleInputPassword1">Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Brand Image"
                                            name="image"
                                            required=""
                                            value={imageName}
                                            onChange={changeImg}
                                        />
                                    </div>

                                    
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                    
                                </form>


                    </div>
                   
                    </div>
                </div>
              
                </section>
             
            </main>
        </>
    )
} */

    return (
  <>
    <main className="main">
      <PageTitle>Update Brand</PageTitle>

      <section
        className="section d-flex justify-content-center align-items-center"
        style={{ marginTop: "6vh" }}
      >
        <HashLoader
          color="#d19c97"
          cssOverride={{ display: "block", margin: "0 auto" }}
          loading={load}
        />

        {!load && (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div
                  className="card shadow-lg rounded-4 p-4"
                  style={{ backgroundColor: "#fff" }}
                >
                  <h3 className="card-title text-center text-dark mb-4 fw-semibold">
                    Update Brand
                  </h3>

                  {/* Previous Image */}
                  {previousImage && (
                    <img
                      src={previousImage}
                      alt="Brand"
                      style={{
                        height: "180px",
                        width: "220px",
                        objectFit: "contain",
                        display: "block",
                        margin: "0 auto 20px",
                      }}
                    />
                  )}

                  <form onSubmit={handleForm} encType="multipart/form-data">
                    <div className="mb-4">
                      <label className="form-label fw-medium text-dark">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Brand"
                        required
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-medium text-dark">
                        Brand Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        value={imageName}
                        onChange={changeImg}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-semibold"
                      style={{
                        backgroundColor: "#d19c97",
                        color: "white",
                      }}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  </>
)
}