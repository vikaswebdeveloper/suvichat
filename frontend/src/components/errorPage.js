import React from 'react';
import logo from "../images/error.png"
import {
    Link
} from "react-router-dom";

const errorPage = () => {

    return (
        <>
            <div className='whole-error' >
                <img src={logo} alt="" className='lawlit' />
                <div className='notFound'>
                    <div className='upper-error'>
                        <h1>404</h1>
                    </div>
                    <div className='lower-error'>
                        <p>You accidently searched a wrong path so click the below button to redirect on the valid page</p>
                    </div>
                    <div className='btn-box'>
                        <Link to="/" className='error-btn'>Home</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default errorPage
