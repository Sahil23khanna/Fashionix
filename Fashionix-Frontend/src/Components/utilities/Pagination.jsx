import { useEffect, useState } from "react"

export let LIMIT=8
export default function Pagination({currentPage, setCurrentPage, total}){
    const [pageArr,setPageArr]=useState([])
    useEffect(()=>{
        let totalPage=Math.ceil(total/LIMIT)
        //round, floor, ceil
        let arr=[]
        for(let i=1;i<=totalPage;i++){
            arr.push(i)     
        }
        setPageArr(arr)
    },[])
    return(
        <>
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${currentPage==1 && "disabled"}`}>
                <a className="page-link" href="#" onClick={()=>{
                    setCurrentPage(currentPage-1)
                }}>
                    Previous
                </a>
                </li>
                {pageArr?.map((pageNo,index)=>(
                <li className={`page-item ${currentPage==pageNo && "active"}`} key={index}>
                <a onClick={()=>{
                    setCurrentPage(pageNo)
                }} className="page-link" href="#">
                    {pageNo}
                </a>
                </li>
                ))}
                
                <li className={`page-item ${pageArr.length==currentPage && "disabled"}`}>
                <a className="page-link" href="#" onClick={()=>{
                    setCurrentPage(currentPage+1)
                }}>
                    Next
                </a>
                </li>
            </ul>
            </nav>
        </>
    )
}