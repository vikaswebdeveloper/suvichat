import React, { useEffect, useState } from 'react'

const Contact = () => {

  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" })

  const userContact = async () => {

    try {
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json();
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      if (res.status === 401) {
        throw new Error("internal server error occured")
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userContact();
  }, [])

  const handleInputs = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, phone, message } = userData;

    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    })

    const data = await res.json();

    if (!data) {
      console.log("internal server error occured");
    } else {
      alert("message sended")
      setUserData({ ...userData, message: "" })
    }
  }

  return (
    <>
      <div className='Contact'>
        <div className='upper-info'>

          <div className='user-info'>
            <div className='icon'>
              <i className="fa-solid fa-mobile-screen-button"></i>
            </div>
            <div className='details'>
              <div>Phone</div>
              <div>7303288076</div>
            </div>
          </div>

          <div className='user-info'>
            <div className='icon'>
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className='details'>
              <div>Email</div>
              <div>shahv7411@gmail.com</div>
            </div>
          </div>

          <div className='user-info'>
            <div className='icon'>
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <div className='details'>
              <div>Address</div>
              <div>13A/4 shahdara bihari colony</div>
            </div>
          </div>

        </div>

        <div className='lower-info'>
          <h2 className='Contactme'>Contact me</h2>
          <form method='POST' className='Contact-form'>
            <div className='inputs'>
              <input type="text" placeholder='Your Name' onChange={handleInputs} name="name" value={userData.name} className='input contact-input' />
              <input type="email" placeholder='Your Email' onChange={handleInputs} name="email" value={userData.email} className='input contact-input' />
              <input type="number" placeholder='Your Phone Number' onChange={handleInputs} name="phone" value={userData.phone} className='input contact-input' />
            </div>
            <div className='textarea'>
              <textarea rows={7} placeholder='Your message for me' onChange={handleInputs} name="message" value={userData.message}></textarea>
            </div>
            <button type='submit' className='contact-button' onClick={handleSubmit}>Send Message</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact
