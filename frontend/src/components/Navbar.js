import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../images/logo.webp'
import { userContext } from "../App"
import {
    Link
} from "react-router-dom";

const Navbar = () => {

    const { state, dispatch } = useContext(userContext)

    const Inside = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/About">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">Log out</Link>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/About">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Contact">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Signin">Sign Up</Link>
                    </li>
                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#"><img src={logo} alt="logo" height='50px' width='60px' /><h3>Suvi</h3></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <Inside />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
