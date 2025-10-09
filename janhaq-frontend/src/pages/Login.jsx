import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import our auth hook

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate(); // Get the navigate function for redirection

  const handleLogin = (e) => {
    e.preventDefault();
    // 1. Call the login function from our context
    login({ email, password }); 
    // 2. Redirect the user to the dashboard
    navigate('/dashboard'); 
  };

  return (
    <div className="flex-grow flex items-center justify-center px-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Login to JanHaq
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email or Mobile"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-300">
          <a href="/register" className="hover:underline">
            Register Now
          </a>
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
