import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URI } from "../config/constants";

const DisplayUsers = (props) => {
    document.title = "Users List "

    const [user, setUser] = useState([]);
    useEffect(() => {
        axios
            .get(`${BACKEND_URI}/pub/users`)
            .then((resp) => {
                const allData = resp.data.data;
                setUser(allData);
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    }, []);

    const userDeleteHandler = (id) => {
        axios
            .delete(`http://localhost:8080/auth/user/${id}`,
                {
                    headers: {
                        'Authorization': `token ${localStorage.getItem('token')}`
                    }
                })
            .then((resp) => {
                console.log("======> ::dellll resp", resp);
                const filteredData = user.filter((ele) => ele.id !== id);
                setUser(filteredData);
            })
            .catch((err) => {
                console.log("~ err", err);
            });
    };

    return (
        <>
            <div className="mx-5 my-5" style={{ color: props.theme === "dark" ? "white" : "black" }}>
                <div className="displayContainer">
                    <h2 className="mx-5 my-5">User Information</h2>
                    <table className="table table-bordered mx-5 my-5">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Subscription</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user
                                .filter(user => props.search ? (
                                    user.firstName?.toLowerCase()?.includes(props.search?.toLowerCase()) ||
                                    user.email?.toLowerCase()?.includes(props.search?.toLowerCase())
                                ) : true)
                                .map((ele, index) => (
                                    <tr key={ele.id}>
                                        <td>{index + 1}</td>
                                        <td>{ele.firstName}</td>
                                        <td>{ele.email}</td>
                                        <td>✔</td>
                                        <div
                                            style={{
                                                textDecoration: "none",
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                            }}
                                        >
                                            <i
                                                onClick={() => userDeleteHandler(ele.id)}
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

export default DisplayUsers;
