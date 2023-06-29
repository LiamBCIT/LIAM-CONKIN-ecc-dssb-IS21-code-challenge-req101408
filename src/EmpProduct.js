import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const EmpProduct = () => {
    const { empid } = useParams();

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        // get product data
        fetch("http://localhost:8000/api/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            <div className="container">
                <div className="card row" style={{ "textAlign": "left" }}>
                    <div className="card-title">
                        <h2>Product Create</h2>
                    </div>
                    <div className="card-body"></div>

                    {empdata &&
                        <div>
                            {/* Product Infomation Displayed */}
                            <h2>Product name is : <b>{empdata.productName}</b>  ({empdata.id})</h2>
                            <h3>Product Details</h3>
                            <h5>productOwnerName is : {empdata.productOwnerName}</h5>
                            <h5>DeveloperName is : {empdata.DeveloperNames}</h5>
                            <h5>ScrumMasterName is : {empdata.ScrumMasterName}</h5>
                            <h5>StartDateName is : {empdata.StartDateName}</h5>
                            <h5>MethodologyName is : {empdata.MethodologyName}</h5>
                            <h5>LocationName is : {empdata.LocationName}</h5>
                            <Link className="btn btn-danger" to="/">Back to Home</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default EmpProduct;