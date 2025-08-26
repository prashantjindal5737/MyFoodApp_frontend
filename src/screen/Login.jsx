import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const resp = await fetch("https://myfoodapp-backend-1.onrender.com/login", {
      method: 'POST', headers: {"Content-Type":"application/json"}, body: JSON.stringify(data)
    });
    const json = await resp.json();
    if (json.success) {
      toast.success('Login successful!');
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
    } else {
      toast.error(json.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={data.email} onChange={e => setData({...data, email: e.target.value})} required />
        <input type="password" placeholder="Password" value={data.password} onChange={e => setData({...data, password: e.target.value})} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
