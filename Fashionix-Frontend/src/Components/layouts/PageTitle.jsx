export default function PageTitle({children}) {
    return (
        <>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">{children}</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <a href="#" className="text-white">Home</a>
                    </li>

                    {/* <li className="breadcrumb-item">
        <a href="#">Pages</a>
      </li> */}

                    <li className="breadcrumb-item active text-white">{children}</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            
        </>
    )
}