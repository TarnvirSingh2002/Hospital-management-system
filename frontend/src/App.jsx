import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import Register from "./Pages/Register";
import Aboutus from "./Pages/Aboutus";
import Nav from "./components/Nav";
import axios from "axios";
import Login from "./Pages/Login";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './main'
import Footer from "./components/Footer";
import MessageBoard from "./Pages/MessageBoard";

export default function App() {
  const { isAuthenticated, setIsAuthenticated, setUser  }=useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/message/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/appointment' element={<Appointment/>}/>
          <Route path='/about' element={<Aboutus/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/allmessages' element={<MessageBoard/>}/>
        </Routes>
        <Footer/>
        <ToastContainer position="top-center"/>
      </BrowserRouter>
    </>
  )
}
