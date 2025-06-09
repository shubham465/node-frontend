import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todo from './Todo.jsx'
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5001/api';

axios.interceptors.request.use(
  (config) => {
    if (!config.url.startsWith(BASE_URL)) {
      config.url = BASE_URL + (config.url.startsWith('/') ? '' : '/') + config.url;
    }
    const token = JSON.parse(localStorage.getItem("token"));
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => Promise.reject(error)
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/dashboard/todo" element={<Todo />} />
        <Route path="/dashboard/todo/*" element={<Todo />} />
      </Routes>
    </Router>
  </StrictMode>
);
