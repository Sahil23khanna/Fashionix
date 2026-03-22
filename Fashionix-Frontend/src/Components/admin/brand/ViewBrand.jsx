import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function ViewBrand(){
    
    const {id}=useParams()
    const [brandName,setBrandName]=useState({})
    const [load,setLoad]=useState(true)

    useEffect(()=>{
        fetchSingleBrand()
    },[id]) 
    const fetchSingleBrand=()=>{
        let formData={
            _id:id
        }
        ApiServices.singleBrand(formData)

        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                setBrandName(res.data.data)
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
        <PageTitle>View Brand</PageTitle>
        <section style={{marginTop:"7vh"}}>
        <HashLoader loading={load} color="#d19c97" cssOverride={{display:"block", margin:"0 auto"}}/>

        <div className={load ? "d-none":"container"}>
            <div className="row justify-content-center my-5">
                <div className="col-md-4">
                    <div className="card" style={{ width: "18rem" }}>
                        <img src={brandName.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{brandName.brandName}</h5>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}