import { Link, useNavigate, Outlet } from 'react-router-dom';

import Hero from '../assets/hero2.jpg';

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/user/login');
  };

  return (
    <div className="h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${Hero})` }}>
      <header className="w-full sticky top-0 z-30 py-4 px-6 flex items-center justify-between glass-container">
        <Link to="/" className="text-2xl font-bold">TaskNest</Link>
        <nav className="flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/user/login" className="text-slate-600 hover:underline font-medium">Login</Link>
              <Link to="/user/register" className="text-slate-600 hover:underline font-medium">Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:underline font-medium bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className="flex-1 flex flex-col w-full h-[calc(100%-76px)] max-w-5xl mx-auto px-2 sm:px-6 md:px-8 lg:px-12 xl:px-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
