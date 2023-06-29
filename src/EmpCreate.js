import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpCreate = () => {
    //create useStates for product details
    const [id, idchange] = useState("");
    const [productName, productNamechange] = useState("");
    const [productOwnerName, productOwnerNamechange] = useState("");
    const [DeveloperNames, setDeveloperNames] = useState(["", "", "", "", ""]);
    const [ScrumMasterName, ScrumMasterNamechange] = useState("");
    const [StartDateName, StartDateNamechange] = useState("");
    const [MethodologyName, MethodologyNamechange] = useState("");
    const [LocationName, LocationNamechange] = useState("");
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = {
            productName,
            productOwnerName,
            DeveloperNames,
            ScrumMasterName,
            StartDateName,
            MethodologyName,
            LocationName,
            active,
        };

        // create new product
        fetch("http://localhost:8000/api", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata),
        })
            .then((res) => {
                alert("Saved successfully.");
                navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleDeveloperNameChange = (index, value) => {
        // get developer name and set developerNames state
        const updatedNames = [...DeveloperNames];
        updatedNames[index] = value;
        setDeveloperNames(updatedNames);
    };

    const addDeveloperInput = () => {
        if (DeveloperNames.length < 5) {
            setDeveloperNames([...DeveloperNames, ""]);
        }
    };

    const removeDeveloperInput = (index) => {
        const updatedNames = [...DeveloperNames];
        updatedNames.splice(index, 1);
        setDeveloperNames(updatedNames);
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Api Create</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {/* ID input */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input
                                                value={id}
                                                disabled="disabled"
                                                className="form-control"
                                            ></input>
                                        </div>
                                    </div>

                                    {/* Product name input */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input
                                                required
                                                value={productName}
                                                onMouseDown={(e) => valchange(true)}
                                                onChange={(e) => productNamechange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                            {productName.length == 0 && validation && (
                                                <span className="text-danger">Enter the name</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Product Owner</label>
                                            <input
                                                value={productOwnerName}
                                                onChange={(e) => productOwnerNamechange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                        </div>
                                    </div>

                                    {DeveloperNames.map((developerName, index) => (
                                        <div className="col-lg-12" key={index}>
                                            <div className="form-group">
                                                <label>Developer {index + 1}</label>
                                                <input
                                                    value={developerName}
                                                    onChange={(e) =>
                                                        handleDeveloperNameChange(index, e.target.value)
                                                    }
                                                    className="form-control"
                                                />
                                            </div>
                                            {index < DeveloperNames.length - 1 && " "}{" "}
                                            {/* Add a space if it's not the last developer */}
                                        </div>
                                    ))}

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Scrum Master</label>
                                            <input
                                                value={ScrumMasterName}
                                                onChange={(e) => ScrumMasterNamechange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input
                                                type="date"
                                                value={StartDateName}
                                                onChange={(e) => StartDateNamechange(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Methodology</label>
                                            <select
                                                value={MethodologyName}
                                                onChange={(e) => MethodologyNamechange(e.target.value)}
                                                className="form-control"
                                            >
                                                <option className="bold" value="">
                                                    [Click to Select Methodology]
                                                </option>
                                                <option value="Agile">Agile</option>
                                                <option value="Waterfall">Waterfall</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Location</label>
                                            <input
                                                value={LocationName}
                                                onChange={(e) => LocationNamechange(e.target.value)}
                                                className="form-control"
                                            ></input>
                                        </div>
                                    </div>

                                    {/* Save button with call to action colors */}
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">
                                                Save
                                            </button>
                                            <Link to="/" className="btn btn-danger">
                                                Back
                                            </Link>
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
};

export default EmpCreate;
