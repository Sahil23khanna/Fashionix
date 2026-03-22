import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle"
import ApiServices from "../../services/ApiServices";
import { HashLoader } from "react-spinners";


export default function EditCategory(){
    const {id}=useParams()    
    const [categoryName,setCategoryName]=useState("")
    const [description, setDescription] = useState("")
    const [image,setImage]=useState(null)
    const [imageName,setImageName]=useState("")
    const [previousImage,setPreviousImage]=useState("")

    const [load,setLoad]=useState(false)

    useEffect(()=>{
        fetchSingleCategory()
    },[id])

    const fetchSingleCategory=()=>{
        ApiServices.singleCategory({_id:id})
        .then((res)=>{
            if(res.data.success){
              
                setCategoryName(res.data.data.categoryName)
                 setDescription(res.data.data.description)
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
        //formdata 
        let formData=new FormData()
        formData.append("_id", id)
        formData.append("categoryName",categoryName)
          formData.append("description",description)
        
        if(!!image){
            formData.append("image", image)
        }
        ApiServices.updateCategory(formData)
        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                nav("/admin/category/manage")
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

   /*  return(
        <>
            <main className="main">
                <PageTitle>Update Category</PageTitle>
                <section id="contact" className="contact section">
              
                <HashLoader color="#d19c97" loading={load} cssOverride={{display:"block", margin:"0 auto"}}/>
             
                <div className={load?"d-none":"container"} >
                    <div className="row justify-content-center gy-4">
                
                    <div className="col-lg-8">
                        <img src={previousImage} style={{height:"200px", width:"250px", display:"block", margin:"10px  auto"}}/>
                     

 <form method="post" onSubmit={handleForm}>

                                    <div className="form-group mb-5 pt-2 pb-2"> 
                                        <label htmlFor="exampleInputEmail1">Category</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Category"
                                            name="category"
                                            required=""
                                            value={categoryName}
                                            onChange={(e)=>{setCategoryName(e.target.value)}}
                                        />
                                    </div>

                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="exampleInputPassword1">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Description About Category"
                                            name="description"
                                            required=""
                                            value={description}
                                            onChange={(e)=>{setDescription(e.target.value)}}
                                        />
                                    </div>


                                     <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="exampleInputPassword1">Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Category Image"
                                            name="image"
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
    ) */


        return (
  <>
    <main className="main">
      <PageTitle>Update Category</PageTitle>

      <section
        className="section d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh", marginTop: "6vh" }}
      >
        <HashLoader
          color="#d19c97"
          loading={load}
          cssOverride={{ display: "block", margin: "0 auto" }}
        />

        {!load && (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="card shadow-lg rounded-4 p-4">

                  <h3 className="text-center mb-4 fw-semibold">
                    Update Category
                  </h3>

                  {/* Previous Image Preview */}
                  {previousImage && (
                    <div className="text-center mb-4">
                      <img
                        src={previousImage}
                        alt="Category"
                        className="img-fluid rounded"
                        style={{
                          maxHeight: "180px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}

                  <form onSubmit={handleForm} encType="multipart/form-data">
                    
                    {/* Category Name */}
                    <div className="mb-4">
                      <label className="form-label fw-medium">
                        Category Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Category"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="form-label fw-medium">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Description about category"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                      <label className="form-label fw-medium">
                        Change Category Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={changeImg}
                        value={imageName}
                      />
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-semibold"
                      style={{
                        backgroundColor: "#d19c97",
                        color: "white",
                      }}
                    >
                      Update Category
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
);

}
