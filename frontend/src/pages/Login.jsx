import { useState } from 'react';
import API from '../api/axios';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      window.location.reload();

    } catch (error) {

      console.log(error);
      alert('Login Failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-2 text-slate-800">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold text-lg"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;