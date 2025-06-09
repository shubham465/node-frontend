import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', email: '', password: '', general: '' });

  const handleChange = (e, setState, field) => {
    setState(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: '', general: '' }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let hasError = false;
    let newErrors = { username: '', email: '', password: '', general: '' };

    if (!username) {
      newErrors.username = 'Username is required.';
      hasError = true;
    }
    if (!email) {
      newErrors.email = 'Email is required.';
      hasError = true;
    }
    if (!password) {
      newErrors.password = 'Password is required.';
      hasError = true;
    }
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('/user/register', {
        username,
        email,
        password
      });
      navigate('/user/login');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.message || "Registration failed. Please try again."
      }));
    }
  };

  return (
    <div className="h-full flex items-center justify-center ">
      <div className="w-full max-w-md glass-card">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => handleChange(e, setUsername, 'username')}
                className={`glass-input ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => handleChange(e, setEmail, 'email')}
                className={`glass-input ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => handleChange(e, setPassword, 'password')}
                className={`glass-input ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            {errors.general && (
              <div className="text-red-600 text-center text-sm">{errors.general}</div>
            )}
            <button
              onClick={handleRegister}
              className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800/95 cursor-pointer transition"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/user/login" className="text-slate-900 hover:underline font-medium">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
