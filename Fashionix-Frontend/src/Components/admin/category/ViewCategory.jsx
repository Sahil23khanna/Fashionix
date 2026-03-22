import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function ViewCategory(){
    
    const {id}=useParams()
   
    const [categoryName,setCategoryName]=useState({})
    const [load,setLoad]=useState(true)

    useEffect(()=>{
        fetchSingleCategory()
    },[id]) 
    const fetchSingleCategory=()=>{
        let formData={
            _id:id
        }
        ApiServices.singleCategory(formData)

        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                setCategoryName(res.data.data)
            }else{
                toast.error(res.data.message)
            }
        })
        .catch((err)=>{
            toast.error(err?.message)
        })
        .finally(()=>{
            setTimeout(()=>{
                setLoad(false)
            },500)
        })
        
    }   
    return(
        <>
        <PageTitle>View Category</PageTitle>
        <section style={{marginTop:"8vh", marginBottom:"8vh"}}>
        <HashLoader loading={load} color="#d19c97" cssOverride={{display:"block", margin:"0 auto"}}/>

        <div className={load ? "d-none":"container"}>
            <div className="row justify-content-center my-5">
                <div className="col-md-4">
                    <div className="card" style={{ width: "18rem" }}>
                        <img src={categoryName.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{categoryName.categoryName}</h5>
                               <p>{categoryName.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}