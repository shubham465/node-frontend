import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';
import Loader from '../Loader';
import Hero from '../../assets/hero2.jpg';
import axios from 'axios';

const Layout = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let activeRequests = 0;
    const start = () => {
      activeRequests++;
      setLoading(true);
    };
    const end = () => {
      activeRequests = Math.max(0, activeRequests - 1);
      if (activeRequests === 0) setLoading(false);
    };
    const reqInterceptor = axios?.interceptors.request.use((config) => {
      start();
      return config;
    });
    const resInterceptor = axios?.interceptors.response.use(
      (response) => {
        end();
        return response;
      },
      (error) => {
        end();
        throw error;
      }
    );
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  console.log('===>> loading', loading)

  return (
    <div className="h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${Hero})` }}>
      {loading && <Loader />}
      <Header />
      <main className="flex-1 flex flex-col w-full h-[calc(100%-76px)] max-w-5xl mx-auto px-2 sm:px-6 md:px-8 lg:px-12 xl:px-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
