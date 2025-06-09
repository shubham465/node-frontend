import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/user/login');
	};

	return (
		<header className="w-full sticky top-0 z-30 py-4 px-6 flex items-center justify-between glass-container">
			<Link to="/" className="text-2xl font-custom font-black bg-gradient-to-r from-indigo-400 to-pink-300 bg-clip-text text-transparent">TaskNest.</Link>
			<nav className="flex items-center gap-4">
				{!token ? (
					<>
						<Link to="/user/login" className="text-slate-600 hover:underline font-medium">Login</Link>
						<Link to="/user/register" className="text-slate-600 hover:underline font-medium">Register</Link>
					</>
				) : (
					<button
						onClick={handleLogout}
						className="text-white bg-indigo-400/80 hover:bg-indigo-500 p-2 rounded-md cursor-pointer"
					>
						Logout
					</button>
				)}
			</nav>
		</header>
	);
};

export default Header;
