import React, { createContext, useReducer } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Home from './components/Home';
import Signin from './components/Signin';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import ErrorPage from './components/errorPage';
import Secret from './components/Secret';
import Logout from './components/Logout';
import { initialState, reducer } from "../src/Reducer/reducer"
import {
  Routes,
  Route,
} from "react-router-dom";

export const userContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/signin' element={<Signin />} ></Route>
      <Route path='/Contact' element={<Contact />} ></Route>
      <Route path='/About' element={<About />} ></Route>
      <Route path='/Login' element={<Login />} ></Route>
      <Route path='*' element={<ErrorPage />} ></Route>
      <Route path='/Secret' element={<Secret />} ></Route>
      <Route path='/Logout' element={<Logout />} ></Route>
    </Routes>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </userContext.Provider>
    </>
  )
}

export default App
