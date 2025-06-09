import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router} from 'react-router-dom';

import App from './App.jsx';
import './index.css';

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
      <App />
    </Router>
  </StrictMode>
);
