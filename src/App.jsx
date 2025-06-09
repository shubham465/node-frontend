import { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  const HandleClick = async () => {
    await axios.post(
      '/user/register',
      { username, email, password }
    ).then((res) => {
      console.log('Registration successful:', res.data);
      navigate('/user/login');
    }).catch((err) => {
      alert(err.message);
      console.error('Registration failed:', err.response?.data || err.message);
    });
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => handleChange(e, setUsername)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => handleChange(e, setPassword)}
        />
        <button onClick={HandleClick}>Register</button>
        <p>
          Already have an account?{' '}
          <a onClick={() => navigate('/user/login')}>
            Go to Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
