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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>
        <div className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => handleChange(e, setEmail, 'email')}
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
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
              className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {errors.general && (
            <div className="text-red-600 text-center text-sm">{errors.general}</div>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/user/register" className="text-blue-600 hover:underline font-medium">
            Go to Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
