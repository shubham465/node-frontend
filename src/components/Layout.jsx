import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/user/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-30">
        <Link to="/" className="text-2xl font-bold text-blue-600">MyApp</Link>
        <nav className="flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/user/login" className="text-blue-600 hover:underline font-medium">Login</Link>
              <Link to="/user/register" className="text-blue-600 hover:underline font-medium">Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline font-medium bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-2 sm:px-6 md:px-8 lg:px-12 xl:px-0 overflow-visible">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
