import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Lock, User } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { username, password });
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-white tracking-wider">ADMIN LOGIN</h2>
        {error && <div className="bg-red-900/50 border border-red-500 text-red-200 text-sm p-3 rounded mb-4 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 uppercase mb-1">Username</label>
            <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
              <User className="w-4 h-4 text-zinc-400 mr-2" />
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="bg-transparent w-full focus:outline-none text-white text-sm" 
                required 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 uppercase mb-1">Password</label>
            <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
              <Lock className="w-4 h-4 text-zinc-400 mr-2" />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="bg-transparent w-full focus:outline-none text-white text-sm" 
                required 
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-zinc-200 transition mt-4">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}