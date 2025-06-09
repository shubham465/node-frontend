import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  const HandleClick = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post('/user/login', {
        email,
        password
      });
      console.log(response.data.accessToken);
      localStorage.setItem("token", JSON.stringify(response.data.accessToken));
      navigate('/dashboard/todo'); 
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Login</h1>
        <input 
          type="email" 
          placeholder="Enter Email" 
          value={email} 
          onChange={(e) => handleChange(e, setEmail)} 
        />
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => handleChange(e, setPassword)} 
        />
        <button onClick={HandleClick}>Login</button>
        <p className="link-button-wrapper">
          Don't have an account?{' '}
          <Link to="/">Go to Register</Link>
        </p>
      </div>
      
    </div>
  );
};

export default Login;
