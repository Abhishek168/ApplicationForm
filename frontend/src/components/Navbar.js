import { useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from 'react-bootstrap'
import { Link } from "react-router-dom";
import LogoName from '../Logo.svg'

const NavbarLink = (props) => {
    let isToken = localStorage.getItem('token')
    if (!isToken) {
        isToken = null
    }
    const [search, setSearch] = useState("")

    const setSearchInput = (e) => {
        setSearch(e.target.value)
    }

    return (<>
        <Navbar className="fixed-top" bg={props.mode} variant={props.mode}>
            <Navbar.Brand href="/home">
                <img src={LogoName} alt="logo" width="60" height="40" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {!isToken ?
                        <>
                            <Link to="/login" className="nav-link"> {props.login}</Link>
                            <Link to="/signup" className="nav-link"> {props.signup}</Link>
                            <Link to="/applicationForm" className="nav-link"> {props.applicationForm}</Link>
                        </> :
                        <>
                            <Link to="/home" className="nav-link"> {props.home}</Link>
                            <Link to="/displayUsers" className="nav-link"> {props.displayUsers}</Link>
                            <Link to="/displayApplicationDetails" className="nav-link"> {props.displayForm} </Link>
                            <Link to="/logout" className="nav-link"> {props.logout} </Link>
                        </>
                    }
                </Nav>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    {
                        isToken && <Form className="d-flex">
                            <input
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={search}
                                onChange={setSearchInput}
                            />
                            <Button
                                onClick={() => props.onSearch(search)}
                                variant="outline-success">Search</Button>
                        </Form>
                    }

                    <div style={{ marginRight: "223px" }} className="form-check form-switch">
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className={`form-check-label text-${props.mode === 'dark' ? 'light' : 'dark'}`} htmlFor="flexSwitchCheckDefault">Theme</label>
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    </>);
}

NavbarLink.defaultProps = {
    title: "Users",
    home: "Home",
    displayUsers: "Users",
    login: "Login",
    signup: "Signup",
    displayForm: "Forms",
    logout: "Logout",
    applicationForm: "applicationForm"
}

export default NavbarLink;