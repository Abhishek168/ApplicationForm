import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { BACKEND_URI } from "../../config/constants";

require('./Auth.css')

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "", firstName: "", lastName: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BACKEND_URI}/pub/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json()
        if (!json.data) {
            props.showAlert("Wrong Credential", "danger")
            navigate("/login");
        }
        localStorage.setItem('token', json.data);
        props.showAlert("Register successful", "success")
        navigate("/");
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ padding: "0px" }}>
            <div className="container">
                <div className="col-left">
                    <div className="login-text">
                        <h2>Subscription</h2>
                        <p>
                            This Page allows User to get
                            Create Application Form
                            <br />
                            User Can Click Submit Application
                        </p>
                        <a className="btn" href="/login">Read More</a>
                    </div>
                </div>
                <div className="col-right">
                    <div className="login-form">
                        <h2>Admin Signup</h2>
                        <form onSubmit={handleSubmit}>
                            <p>
                                <input type="firstName" placeholder="First Name" className="form-control" value={credentials.firstName} onChange={onChange} name="firstName" id="firstName" />
                            </p>
                            <p>
                                <input type="lastName" placeholder="Last Name" className="form-control" value={credentials.lastName} onChange={onChange} name="lastName" id="lastName" />
                            </p>
                            <p>
                                <input type="email" placeholder="Email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                            </p>
                            <p>
                                <input type="password" placeholder="Password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                            </p>
                            <p>
                                <input className="btn" type="submit" value="Sign In" />
                            </p>
                            <p>
                                <Link to="/login">Already a user.</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Signup
