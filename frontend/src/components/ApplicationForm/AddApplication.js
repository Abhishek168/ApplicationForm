import './style.css';
import { BACKEND_URI } from "../../config/constants";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddApplicationForm = (props) => {
    const [details, setDetails] = useState({
        universityName: "",
        educationDetail: "",
        companyName: "",
        language: "",
    })

    const [error, setError] = useState({})
    const onChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value })
    }

    // Errror handline at onBlur
    const onBlur = (e) => {
        const { name, value } = e.target;
        setError(validateError(name, value))
    }
    const navigate = useNavigate();

    const submitApplicationHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BACKEND_URI}/pub/application`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        });
        const json = await response.json()
        if (!json.data) {
            props.showAlert("Something went wrong", "danger")
            navigate("/applicationForm");
        }
        else {
            localStorage.setItem('token', json.data);
            props.showAlert("Login successful", "success")
            navigate("/displayApplicationDetails");
        }
    };

    const validateError = (name, value) => {
        let updatedError = { ...error }
        // universityName validate
        if (name === "universityName") {
            if (!value) {
                console.log("===> :: updatedError[name] ", updatedError[name]);
                updatedError[name] = "universityName is required"
            }
            else {
                value.length < 2 ?
                    updatedError[name] = "universityName character should be greate 2 character"
                    :
                    updatedError[name] = ""
            }
        }
        // educationDetail
        else if (name === "educationDetail") {
            if (!value) {
                updatedError[name] = "educationDetail is required"
            }
            else {
                updatedError[name] = "";
            }
        }
        // companyName Validate
        else if (name === "companyName") {
            if (!value) {
                updatedError[name] = "companyName is required"
            }
            else {
                updatedError[name] = "";
            }
        }
        // language Validate
        else if (name === "language") {
            if (!value) {
                updatedError[name] = "language is required"
            }
            else {
                value.length < 2 ?

                    updatedError[name] = "language must be of 4 characters"
                    :
                    updatedError[name] = ""
            }
        }
        else {
            updatedError[name] = ""
        }
        return updatedError
    }

    return (
        <>
            <div className='application-top'>
                <div className="form-body">
                    <div className="row">
                        <div className="form-holder">
                            <div className="form-content">
                                <div className="form-items">
                                    <h3>Application Form</h3>
                                    <p>Fill the data below.</p>
                                    <form onSubmit={submitApplicationHandler} className="requires-validation" >
                                        <div className="col-md-12">
                                            <input
                                                name="universityName"
                                                value={details.universityName}
                                                onChange={onChange}
                                                onBlur={(e) => onBlur(e)}
                                                className="form-control" type="text" placeholder="Enter University Name" />
                                            <span className='error'>{error?.universityName}</span>
                                        </div>

                                        <div className="col-md-12">
                                            <input
                                                name="educationDetail"
                                                value={details.educationDetail}
                                                onChange={onChange}
                                                onBlur={(e) => onBlur(e)}
                                                className="form-control" type="text" placeholder="Enter your Degree (ex. Bsc,BCA,MCA)" />
                                            <span className='error'>{error?.educationDetail}</span>
                                        </div>

                                        <div className="col-md-12">
                                            <select
                                                name="language"
                                                value={details.language}
                                                onChange={onChange}
                                                onBlur={(e) => onBlur(e)}
                                                className="form-select mt-3" >
                                                <option value="">Select language</option>
                                                <option value="Friends">English</option>
                                                <option value="Family">Hindi</option>
                                                <option value="others">Gujati</option>
                                            </select>
                                            <span className='error'>{error?.language}</span>
                                        </div>

                                        <div className="col-md-12">
                                            <input
                                                name="companyName"
                                                value={details.companyName}
                                                onChange={onChange}
                                                onBlur={(e) => onBlur(e)}
                                                className="form-control" type="text" placeholder="Enter your company name" autoComplete="on" />
                                            <span className='error'>{error?.companyName}</span>
                                        </div>
                                        <div className="form-button mt-3">
                                            <button id="submit" type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default AddApplicationForm;