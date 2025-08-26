import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

const Signup = () => {
  const [data, setData] = useState({ name: '', email: '', password: '', address: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const resp = await fetch("https://myfoodapp-backend-1.onrender.com/createuser", {
      method: 'POST', headers: {"Content-Type":"application/json"}, body: JSON.stringify(data)
    });
    const json = await resp.json();
    if (json.success) {
      toast.success('Signup successful!');
      navigate('/login');
    } else toast.error(json.error || 'Signup failed');
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Signup</h2>
        <input type="text" placeholder="Name" value={data.name} onChange={e => setData({...data, name: e.target.value})} required />
        <input type="email" placeholder="Email" value={data.email} onChange={e => setData({...data, email: e.target.value})} required />
        <input type="text" placeholder="Address" value={data.address} onChange={e => setData({...data, address: e.target.value})} required />
        <input type="password" placeholder="Password" value={data.password} onChange={e => setData({...data, password: e.target.value})} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
