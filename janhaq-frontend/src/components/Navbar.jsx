import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext'; // Import our auth hook

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user status and logout function

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Laws', path: '/laws' },
    { name: 'Schemes', path: '/schemes' },
    { name: 'Problem Solver', path: '/problem-solver' },
  ];
  
  // Add dashboard link only if user is logged in
  if (user) {
      navLinks.push({ name: 'Dashboard', path: '/dashboard' });
  }

  const linkClasses = (path) =>
    `font-medium transition ${
      location.pathname === path
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-gray-700 dark:text-gray-200 hover:text-blue-500'
    }`;
    
  const handleLogout = () => {
      logout();
      navigate('/'); // Redirect to home after logout
      setMenuOpen(false);
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          JanHaq
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={linkClasses(link.path)}>
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center space-x-2">
            {/* Conditional Buttons */}
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition text-sm">
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition text-sm"
              >
                Logout
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 ${linkClasses(link.path)}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Conditional Mobile Buttons */}
          <div className="px-6 py-3 space-y-2">
             {!user ? (
              <>
                 <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-center w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block text-center w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                  Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition">
                Logout
              </button>
            )}
          </div>

          <div className="px-6 py-3 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
