import React from 'react';
import logo from '../images/signin.png';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from "../App"
import {
  Link
} from "react-router-dom";

const Signin = () => {

  const { state, dispatch } = useContext(userContext)

  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""
  })

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password
      })
    })

    if (password !== cpassword) {
      console.log("password doesn't match");
    } else {

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        window.alert("Invalid registration")
      } else {
        window.alert("Registration successfully")
        navigate("/login")
      }
    }

  }

  return (
    <>
      <section className='signup'>
        <div className='container'>
          <div className='signin-components'>
            <div className='signin-form'>
              <div className='right-form'>
                <h2 className='form-title'>Sign up</h2>
                <form method='POST' className='SignUp-form'>

                  <div className='form-group'>
                    <label htmlFor="name">
                      <i className="fa-solid fa-user"></i>
                    </label>
                    <input className='input' type="text" name='name' id='name' value={user.name} onChange={handleInputs} autoComplete='off' placeholder='Your name' />
                  </div>

                  <div className='form-group'>
                    <label htmlFor="email">
                      <i className="fa-solid fa-envelope"></i>
                    </label>
                    <input className='input' type="email" name='email' id='email' value={user.email} onChange={handleInputs} autoComplete='off' placeholder='Your email' />
                  </div>

                  <div className='form-group'>
                    <label htmlFor="phone">
                      <i className="fa-solid fa-phone"></i>
                    </label>
                    <input className='input' type="number" name='phone' id='Phone' value={user.phone} onChange={handleInputs} autoComplete='off' placeholder='Your phone number' />
                  </div>

                  <div className='form-group'>
                    <label htmlFor="work">
                      <i className="fa-solid fa-briefcase"></i>
                    </label>
                    <input className='input' type="text" name='work' id='work' value={user.work} onChange={handleInputs} autoComplete='off' placeholder='Your profession' />
                  </div>

                  <div className='form-group'>
                    <label htmlFor="password">
                      <i className="fa-solid fa-lock"></i>
                    </label>
                    <input className='input' type="password" name='password' id='password' value={user.password} onChange={handleInputs} autoComplete='off' placeholder='password' />
                  </div>

                  <div className='form-group'>
                    <label htmlFor="cpassword">
                      <i className="fa-solid fa-lock"></i>
                    </label>
                    <input className='input' type="password" name='cpassword' id='cpassword' value={user.cpassword} onChange={handleInputs} autoComplete='off' placeholder='Confirm password' />
                  </div>

                  {/* <div className='form-group'>
                    <label htmlFor="pic">
                      <i className="fa-solid fa-image"></i>
                    </label>
                    <input className='pic' type="file" name='pic' id='pic' value={user.pic} onChange={handleInputs} />
                  </div> */}

                  <div className='form-group form-button'>
                    <input className='button' type="submit" name='Signup' id='Signup' value='Signup' onClick={handleSubmit} />
                  </div>

                </form>
              </div>
              <div className='Signin-image'>
                <figure>
                  <img className='charizard' src={logo} alt="logo" />
                </figure>
                <Link className='signup-link' to='/login'>Already registered?</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signin
