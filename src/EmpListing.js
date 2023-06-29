import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadProduct = (id) => {
        navigate("/api/product/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/api/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/api/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        // get product data
        fetch("http://localhost:8000/api").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            //check error
            empdatachange([])
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Product Listings</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="api/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    {/* display titles of table of products */}
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Product Name</td>
                                <td>Product Owner</td>
                                <td>Developers</td>
                                <td>Scrum Master</td>
                                <td>Start Date</td>
                                <td>Methodology</td>
                                <td>Location</td>
                                <td>Options</td>
                            </tr>
                        </thead>
                        <tbody>

                            {/* display table of products information */}
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.productOwnerName}</td>
                                        <td>{item.DeveloperNames.join(' ')}</td>
                                        <td>{item.ScrumMasterName}</td>
                                        <td>{item.StartDateName}</td>
                                        <td>{item.MethodologyName}</td>
                                        <td>{item.LocationName}</td>
                                        <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadProduct(item.id) }} className="btn btn-primary">Product Info</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;
