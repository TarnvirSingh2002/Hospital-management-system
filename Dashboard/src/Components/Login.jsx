import React, { useContext, useState } from 'react'
import { context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");

    const {authenticated, setAuthenticated}=useContext(context);

    const navigateTo = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await axios
          .post(
            "http://localhost:4000/api/v1/message/login",
            { email, password, confirmPassword, role: "Admin" },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            toast.success(res.data.message);
            setAuthenticated(true);
            navigateTo('/');
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    if (authenticated) {
      console.log(authenticated);
      return <Navigate to={"/"} />;
    }
  return (
    <>
    <section className="container form-component" id="m">
      <img src="/logo.png" alt="logo" style={{height:"200px"}}className="logo" />
      <h1 className="form-title">WELCOME TO MEECARE</h1>
      <p>Only Admins Are Allowed To Access These Resources!</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  </>
  )
}
