import React, { useContext, useState } from 'react'
import loginpic from "../images/login.png"
import { useNavigate } from 'react-router-dom';
import { userContext } from "../App"
import {
  Link
} from "react-router-dom";

const Login = () => {

  const { state, dispatch } = useContext(userContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginUser = async (e) => {
    e.preventDefault()

    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid login")
    } else {
      dispatch({ type: 'authenticate', payload: true })
      window.alert("login successfully")
      navigate("/")
    }
  }

  return (
    <>
      <section className='login' style={{ "backgroundColor": "#e19721" }}>
        <div className='container' style={{ "backgroundColor": "#e19721" }}>
          <div className='signin-components' style={{ "backgroundColor": "#e19721" }}>
            <div className='signin-form'>
              <div className='Signin-image left-image'>
                <figure>
                  <img className='pikachu' src={loginpic} alt="logo" height='380vh' width='380vh' />
                </figure>
                <figcaption>pika-pi-pi-pika-pikachu</figcaption>
                <Link className='login-link' to='/Signin'>(Don't have any account?)</Link>
              </div>
              <div className='right-form'>
                <h2 className='form-title'>Login</h2>
                <form className='SignUp-form' method='POST'>

                  <div className='form-group'>
                    <label htmlFor="email">
                      <i className="fa-solid fa-envelope"></i>
                    </label>
                    <input className='input' type="email" name='email' id='email' autoComplete='off' value={email} onChange={(e) => {
                      setEmail(e.target.value)
                    }} placeholder='Your email' />
                  </div>

                  <div className='form-group'>
                    <label htmlFor="password">
                      <i className="fa-solid fa-lock"></i>
                    </label>
                    <input className='input' type="password" name='password' id='password' autoComplete='off' value={password} onChange={(e) => {
                      setPassword(e.target.value)
                    }} placeholder='password' />
                  </div>

                  <div className='form-group form-button'>
                    <input className='buttonp' type="submit" name='login' id='login' value='Log In' onClick={loginUser} />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
