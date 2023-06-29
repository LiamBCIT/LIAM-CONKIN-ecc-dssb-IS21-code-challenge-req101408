import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();

    // fetch data
    useEffect(() => {
        fetch("http://localhost:8000/api/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            productNamechange(resp.productName);
            productOwnerNamechange(resp.productOwnerName);
            DeveloperNamechange(resp.DeveloperName);
            ScrumMasterNamechange(resp.ScrumMasterName);
            activechange(resp.isactive);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    // declare useStates
    const [id, idchange] = useState("");
    const [productName, productNamechange] = useState("");
    const [productOwnerName, productOwnerNamechange] = useState("");
    const [DeveloperName, DeveloperNamechange] = useState("");
    const [ScrumMasterName, ScrumMasterNamechange] = useState("");
    const [StartDateName, StartDateNamechange] = useState("");
    const [MethodologyName, MethodologyNamechange] = useState("");
    const [LocationName, LocationNamechange] = useState("");
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, productName, productOwnerName, DeveloperName, ScrumMasterName, StartDateName, MethodologyName, LocationName, active };

        // edit product
        fetch("http://localhost:8000/api/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert('Saved successfully.')
            navigate('/');
        }).catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2>Api Edit</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input required value={productName} onMouseDown={e => valchange(true)} onChange={e => productNamechange(e.target.value)} className="form-control"></input>
                                            {productName.length == 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Product Owner</label>
                                            <input value={productOwnerName} onChange={e => productOwnerNamechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Developers</label>
                                            <input value={DeveloperName} onChange={e => DeveloperNamechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Scrum Master</label>
                                            <input value={ScrumMasterName} onChange={e => ScrumMasterNamechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input type="date" value={StartDateName} onChange={e => StartDateNamechange(e.target.value)} className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Methodology</label>
                                            <select
                                                value={MethodologyName}
                                                onChange={e => MethodologyNamechange(e.target.value)}
                                                className="form-control"
                                            >
                                                <option className="bold" value="">[Click to Select Methodology]</option>
                                                <option value="Agile">Agile</option>
                                                <option value="Waterfall">Waterfall</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input value={LocationName} onChange={e => LocationNamechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default EmpEdit;
