import React, { useEffect, useState } from 'react';
import goku2 from "../images/goku2.png"
import goku from "../images/goku3.png"

const Home = () => {

  const [userName, setUserName] = useState('')
  const [show, setShow] = useState('')

  const userIntro = async () => {

    try {
      const res = await fetch('/getData', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json();
      setUserName(data.name);
      setShow(true);

      if (res.status === 401) {
        throw new Error("internal server error occured")
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userIntro();
  })

  return (
    <>
      <div className='home'>
        <div>
          <img className='goku2' src={goku} alt="" />
        </div>
        <div className='intro'>
          <h4 className='greet'>Hello</h4>
          <h1>{userName}</h1>
          <div className='explain'>{show ? 'Nice to meet you again. now you can send message to the creater or you can see your profile' : 'Welcome you my friend to my website and now you can join me you just have to go to the login page'}</div>
        </div>
        <div>
          <img className='goku3' src={goku2} alt="" />
        </div>
      </div>
    </>
  )
}

export default Home
