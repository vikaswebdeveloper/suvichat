import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../images/doraemon.png"

const About = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", work: "", })

  const navigate = useNavigate();

  const callAboutPage = async () => {

    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        Credentials: "include"
      })

      const data = await res.json();
      setUserData(data)

      if (res.status === 401) {
        throw new Error("internal server error occured")
      }

    } catch (error) {
      console.log(error);
      navigate('/secret')
    }
  }

  useEffect(() => {
    callAboutPage();
  }, [])

  return (
    <>
    <div className='whole-about'>
      <div className='about'>
        <div className='upper-about'>
          <img className='user-image' src={logo} alt="" />
          <h5 className='about-text'>At this moment there is no image facility but in future i will add so, sorry for this time</h5>
        </div>
        <div className='lower-about'>
          <div className='user-field'>
            <h4 className='data'>Name :</h4>
            <h4 className='data'>email :</h4>
            <h4 className='data'>phone number :</h4>
            <h4 className='data'>profession :</h4>
          </div>
          <div className='user-data'>
            <h4 className='data'>{userData.name}</h4>
            <h4 className='data'>{userData.email}</h4>
            <h4 className='data'>{userData.phone}</h4>
            <h4 className='data'>{userData.work}</h4>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default About
