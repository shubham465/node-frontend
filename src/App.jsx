import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  return token ? children : (
    <Navigate to="/user/login" state={{ from: location }} replace />
  );
}

function App() {
  const token = localStorage.getItem('token');
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            token
              ? <Navigate to="/dashboard/todo" replace />
              : <Navigate to="/user/login" replace />
          }
        />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route
          path="/dashboard/todo/*"
          element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
