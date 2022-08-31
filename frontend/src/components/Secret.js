import React from 'react'
import pic1 from '../images/secret.webp'
import {
    Link
} from "react-router-dom";

const Secret = () => {
    return (
        <>
            <div className='secret'>
                <div className='secret-div'>
                    <div className='secret-msg'>
                        You are not a genuine person go to the login page by the following button and become a genuine person otherwise i will write your nane in the death note.
                    </div>
                    <h3 className='secret-slogan'>(kira is justice)</h3>
                    <div className='secret-btn-box'>
                        <Link to="/login" className='secret-btn'>Login</Link>
                    </div>
                </div>
                <img src={pic1} alt="" className='secret-pic' />
            </div>
        </>
    )
}

export default Secret
