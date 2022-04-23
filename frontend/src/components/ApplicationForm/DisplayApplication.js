import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URI } from "../../config/constants";

const DisplayApplicationDetails = (props) => {
    document.title = "ApplicationDisplay"

    const [formDetails, setFormDetails] = useState([]);
    useEffect(() => {
        axios
            .get(`${BACKEND_URI}/auth/application`, {
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            })
            .then((resp) => {
                const allData = resp.data.data.applicationFormData;
                console.log("===> :: allData", allData);
                setFormDetails(allData);
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    }, []);

    const applicationDeleteHandler = (id) => {
        axios
            .delete(`${BACKEND_URI}/auth/application/${id}`,
                {
                    headers: {
                        'Authorization': `token ${localStorage.getItem('token')}`
                    }
                })
            .then((resp) => {
                if (formDetails) {
                    const filteredData = formDetails.filter((ele) => ele.id !== id);
                    setFormDetails(filteredData);
                }
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    };

    return (
        <>
            <div className="mx-5 my-5" style={{ color: props.theme === "dark" ? "white" : "black" }}>
                <div className="displayContainer">
                    <h2 className="mx-5 my-5">ApplicationForn Detail</h2>
                    <table className="table table-bordered mx-5 my-5">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>universityName</th>
                                <th>educationDetail</th>
                                <th>companyName</th>
                                <th>language</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formDetails
                                .filter(user => props.search ? (
                                    user.universityName?.toLowerCase()?.includes(props.search?.toLowerCase()) ||
                                    user.educationDetail?.toLowerCase()?.includes(props.search?.toLowerCase())
                                ) : true)
                                .map((ele, index) => (
                                    <tr key={ele.id}>
                                        <td>{index + 1}</td>
                                        <td>{ele.universityName}</td>
                                        <td>{ele.educationDetail}</td>
                                        <td>{ele.companyName}</td>
                                        <td>{ele.language}</td>
                                        <div
                                            style={{
                                                textDecoration: "none",
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                            }}
                                        >
                                            <i
                                                onClick={() => applicationDeleteHandler(ele.id)}
                                                className="fa fa-trash-o"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="d-flex justify-content-end pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>

                </div>
            </div>
        </>
    );
};

export default DisplayApplicationDetails;
