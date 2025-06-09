import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });

  const handleChange = (e, setState, field) => {
    setState(e.target.value);
    setErrors((prev) => ({ ...prev, [field]: '', general: '' }));
  };

  const handleLogin = async () => {
    let hasError = false;
    let newErrors = { email: '', password: '', general: '' };

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
      const response = await axios.post('/user/login', {
        email,
        password
      });
      localStorage.setItem("token", JSON.stringify(response.data.accessToken));
      navigate('/dashboard/todo');
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.message || "Login failed. Please try again."
      }));
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-md glass-card">
        <h1 className="text-3xl font-bold text-center text-slate-700 mb-8">Login</h1>
        <div className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => handleChange(e, setEmail, 'email')}
              className={`glass-input ${errors.email ? 'border border-red-500' : 'border border-white/20'}`}
            />
            {errors.email && (
              <p className="text-red-400 text-bold text-md mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => handleChange(e, setPassword, 'password')}
              className={`glass-input ${errors.password ? 'border border-red-500' : 'border border-white/20'}`}
            />
            {errors.password && (
              <p className="text-red-400 text-bold text-md mt-1">{errors.password}</p>
            )}
          </div>
          {errors.general && (
            <div className="text-red-400 text-bold text-center text-md">{errors.general}</div>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800/95 transition cursor-pointer"
          >
            Login
          </button>
        </div>
        <p className="mt-6 text-center">
          Don't have an account?{' '}
          <Link to="/user/register" className="text-slate-900 hover:underline font-medium">
            Go to Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
